from flask import Flask , render_template, redirect,url_for,request,send_from_directory,session,jsonify
import json
from flask_session import Session
import librosa
import os
from scipy.fftpack import rfft, irfft, fftfreq, fft
import soundfile as sf

modes = {"uniform":[20,31,63,125,250,500,1000,2000,4500,9000,20000],
        "musical":[20,125,250,500,1000,2000,4500,9000,20000],
        "vocals":[20,125,250,5004500,9000,20000],
        "EMG":[20500,1000,2000,4500,9000,20000],
        }
sliders = {
    "slider0":0,
    "slider1":0,
    "slider2":0,
    "slider3":0,
    "slider4":0,
    "slider5":0,
    "slider6":0,
    "slider7":0,
    "slider8":0,
    "slider9":0
}

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

def uniform(length,sr,gains,f_signal):
    ranges = [20,31,63,125,250,500,1000,2000,4500,9000,20000]
    sample_period = 1/sr
    W = fftfreq(length, d=sample_period)
    cuttoff = f_signal.copy()
    for i in range(len(gains)-1):
        cuttoff[(W<ranges[i+1]) & (W>ranges[i])] *= 10**(int(gains[i])/20) 

        
    audio = irfft(cuttoff)
    sf.write('./static/audio/proccessed.wav', audio, sr, subtype='PCM_24')

    return audio

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

            elif session["mode"] == "musical":
                uniform(session["len_audio"],session["sr"], session["sliders"],session["fft"])

            elif session["mode"] == "vocal":
                uniform(session["len_audio"],session["sr"], session["sliders"],session["fft"])

            elif session["mode"] == "ECG":
                uniform(session["len_audio"],session["sr"], session["sliders"],session["fft"])
        
        
        elif 'upload' in request.form:
            if request.files['file']:
                file = request.files['file']
                audio, session["sr"] = librosa.load(file)
                new_audio(audio, session["sr"])
                session["len_audio"]= len(audio)
                session["fft"] = rfft(audio)
                
                
            
            
        #to do:check if file is empty
    #file = request.files['file']
    #fft(file)

        
        
    
    return render_template('index.html' ,sliders_values=json.dumps(session["sliders"]), mode = session["mode"])

if __name__ == '__main__':
    app.run(debug=True)