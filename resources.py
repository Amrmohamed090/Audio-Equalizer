from scipy.fftpack import rfft, irfft, rfftfreq
import soundfile as sf
import numpy as np
import data
import matplotlib.pyplot as plt

def save(cutoff, sr):
    audio = irfft(cutoff)
    sf.write('./static/audio/proccessed.wav', audio, sr, subtype='PCM_24')


def uniform(length,sr,gains,f_signal):
    ranges = [22,44,88,177,355,710,1420,2840,5680,11360,22720]
    sample_period = 1/sr
    W = rfftfreq(length, d=sample_period)
    cutoff = f_signal.copy()

    for i in range(len(ranges)-1):
        length_period = len(cutoff[(W<ranges[i+1]) & (W>ranges[i])])
        cutoff[(W<ranges[i+1]) & (W>ranges[i])] *= 10**(int(gains[i])*np.hanning(length_period)/20)      
    
    save(cutoff, sr)

def by_ranges(length,sr,gains,f_signal,mode):
    if mode == "musical":
        ranges = data.musical_ranges
    else:
        ranges = data.vocal_ranges
    sample_period = 1/sr
    W = rfftfreq(length, d=sample_period)
    cutoff = f_signal.copy()
    for i in range(len(gains)):
        for r in ranges[i]:
            cutoff[((W<r[1]) & (W>r[0]))] *= 10**(int(gains[i])*np.hanning(len(cutoff[(W>r[0])&(W<r[1])]))/20)
    cutoff[W>3000] *=0
    save(cutoff, sr)

