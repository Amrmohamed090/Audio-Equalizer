from flask import Flask , render_template, redirect,url_for,request,send_from_directory,session,jsonify, make_response

import json
from flask_session import Session
import librosa
import os
from scipy.fftpack import rfft, irfft, fftfreq
import soundfile as sf
import numpy as np
from resources import *



app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
SECRET_KEY = os.urandom(32)
app.config['SECRET_KEY'] = SECRET_KEY
UPLOAD_FOLDER = './static/audio'
ALLOWED_EXTENSIONS = {'mp3', 'wav'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def new_audio(audio, sr):
    sf.write('./static/audio/original.wav', audio, sr, subtype='PCM_24')
    sf.write('./static/audio/proccessed.wav', audio, sr, subtype='PCM_24')

def submit_sliders_values(req):
    values = []
    for i in range(10):
        try:
            values.append(req.form["slider"+str(i)])
        except:
            pass
        
    return values

def deserialize(series):
    splited = series.split('&')
    for i in range(len(splited)):
        splited[i] = splited[i].split('=')[1]
    mode = splited[0]
    sliders = splited[1:]
    
    return mode, sliders


@app.route("/",methods = ['POST', 'GET'])
def main():
    if (not "mode" in session) or (not "sliders" in session) or (not "fft" in session) or (not "len_audio" in session):
        session["mode"] = "uniform"
        session["sliders"] = [0,0,0,0,0,0,0,0,0,0]
        audio, session["sr"] = librosa.load("./static/audio/original.wav")
        session["len_audio"]= len(audio)
        session["fft"] = rfft(audio) 


    if request.method == "POST":
        
        if "serialized" in request.form:
            mode, sliders_values=  deserialize(request.form["serialized"])
            print(mode)
            print(sliders_values)

        elif 'submit' in request.form:
            sliders_values = submit_sliders_values(request)

        if "serialized" in request.form or 'submit' in request.form:
            if sliders_values != session["sliders"]:
                session["sliders"] = sliders_values
                try:
                    session["mode"] = request.form["Mode"]
                except:
                    session["mode"] = mode


            if session["mode"] == "uniform":
                uniform(session["len_audio"],session["sr"], session["sliders"], session["fft"])
                

            elif session["mode"] == "musical" or  session["mode"] == "vocal":
                by_ranges(session["len_audio"],session["sr"], session["sliders"],session["fft"],session["mode"])


            elif session["mode"] == "ECG":
                uniform(session["len_audio"],session["sr"], session["sliders"],session["fft"])
        
        
        elif 'upload' in request.form:
            print(request.files['file'])
            if request.files['file']:
                file = request.files['file']
                audio, session["sr"] = librosa.load(file)
                new_audio(audio, session["sr"])
                session["len_audio"]= len(audio)
                session["fft"] = rfft(audio)
                session["sliders"] = [0,0,0,0,0,0,0,0,0,0]
                
            
            
        #to do:check if file is empty
    #file = request.files['file']
    #fft(file)

        
        
    
    return render_template('index.html' ,sliders_values=json.dumps(session["sliders"]), mode = session["mode"])

if __name__ == '__main__':
    app.run(debug=True)