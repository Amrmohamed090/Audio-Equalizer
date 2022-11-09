from flask import Flask , render_template, redirect,url_for,request,send_from_directory,session
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


def fft(file):
    audio, sr = librosa.load(file)
    sf.write('./static/audio/original.wav', audio, sr, subtype='PCM_24')
    sample_period = 1/sr
    W = fftfreq(len(audio), d=sample_period)
    f_signal = rfft(audio)
    cut_f_signal = f_signal.copy()
    cut_f_signal[W>20] *= 0
        
    audio = irfft(cut_f_signal)
    sf.write('./static/audio/proccessed.wav', audio, sr, subtype='PCM_24')

    return audio

def get_sliders_values(req):
    values = []
    for i in range(10):
        try:
            values.append(req.form["slider"+str(i)])
        except:
            pass
        
    return values



@app.route("/",methods = ['POST', 'GET'])
def main():
    if (not "mode" in session) or (not "sliders" in session):
         session["mode"] = "uniform"
         session["sliders"] = [0,0,0,0,0,0,0,0,0,0]
    if request.method == "GET":
        pass

    if request.method == "POST":
        if request.form:
            sliders_values = get_sliders_values(request)
            if sliders_values != session["sliders"]:
                session["sliders"] = sliders_values
                session["mode"] = request.form["Mode"]
          
            
                
            
            
        #to do:check if file is empty
            print(sliders_values)
        #file = request.files['file']
        #fft(file)
            print(request.form["Mode"])
        return render_template('index.html',sliders_values=json.dumps(session["sliders"]), mode = session["mode"] )
        

    return render_template('index.html' ,sliders_values=json.dumps(session["sliders"]), mode = session["mode"])

