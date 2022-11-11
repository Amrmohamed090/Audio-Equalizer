const margin = 10;
const chunkFactor = 600;

const dropArea = document.getElementById('drop-area');
const meter = document.getElementById('meter');


const fileNameEl = document.getElementById('filename-container');
const statsContainerEl = document.getElementById('stats-container');
const waveformContainerEl = document.getElementById('waveform');
const spectogramContainerEl = document.getElementById('wave-spectrogram');

// On load hide the filename, stats and waveform containers
fileNameEl.style.display = 'none';
statsContainerEl.style.display = 'none';
waveformContainerEl.style.display = 'none';
spectogramContainerEl.style.display = 'none';

const reader = new FileReader();
const offlineAudioContext = new OfflineAudioContext({
  length: 1,
  sampleRate: 44100,
});

WaveSurfer.util
  .fetchFile({ url: 'colordata.json', responseType: 'json' })
  .on('success', (colorMap) => {
    createWaveSurfer(colorMap);
  });

let wavesurfer;

const createWaveSurfer = (colorMap) => {
  wavesurfer = WaveSurfer.create({
    container: '#waveform',
    normalize: true,
    responsive: true,
    waveColor: '#9b37c5',
    plugins: [
      WaveSurfer.spectrogram.create({
        container: '#wave-spectrogram',
        labels: true,
        colorMap: colorMap,
        height: 256,
        responsive: true,
      }),
    ],
  });
};

['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
  dropArea.addEventListener(eventName, (e) => e.preventDefault(), false);
});

['dragenter', 'dragover'].forEach((eventName) => {
  dropArea.addEventListener(eventName, highlight, false);
});
['dragleave', 'drop'].forEach((eventName) => {
  dropArea.addEventListener(eventName, unhighlight, false);
});

function highlight(e) {
  dropArea.classList.add('highlight');
}

function unhighlight(e) {
  dropArea.classList.remove('highlight');
}

dropArea.addEventListener('drop', (e) => {
  const files = e.dataTransfer.files;

  handleFiles(files);
});

document.getElementById('fileInput').addEventListener('change', function (e) {
  const files = this.files;

  handleFiles(files);
});

const handleFiles = (files) => {
  fileInput.files = files;
  const file = files[0];
  document.getElementById('filename').innerText = file.name;
  reader.readAsArrayBuffer(file);
};

reader.addEventListener('loadstart', () => {
  loading = true;
});

reader.addEventListener('load', (e) => {
  // Create a Blob providing as first argument a typed array with the file buffer
  var blob = new window.Blob([new Uint8Array(e.target.result)]);
  // Load the blob into Wavesurfer
  wavesurfer.loadBlob(blob);

  // handle data as an array buffer
  handleAudioData(reader.result);
});

const handleAudioData = async (arrayBuffer) => {
  const audioBuffer = await offlineAudioContext.decodeAudioData(arrayBuffer);
  // const float32Array = audioBuffer.getChannelData(0);
  // drawToCanvas(float32Array);
  analyseAudio(audioBuffer);
};

const analyseAudio = (audioBuffer) => {
  const signal = new Float32Array(512);

  let maximums = new Array(signal.length).fill(0);

  for (let i = 0; i < audioBuffer.sampleRate * 5; i += 512) {
    audioBuffer.copyFromChannel(signal, 0, i);

    const floatArray = Meyda.extract('amplitudeSpectrum', signal);

    for (let i = 0; i < floatArray.length; i++) {
      if (floatArray[i] > maximums[i]) {
        maximums[i] = floatArray[i];
      }
    }
  }

  const bandWidth = 43.06640625 * 2;

  const filteredMaximums = maximums.map((amp) => (amp < 0.01 ? 0 : amp));

  const highestFreq = filteredMaximums.indexOf(0) * bandWidth;

  meter.value = highestFreq / 22050;


  // When ready, display stats
  fileNameEl.style.display = 'initial';
  statsContainerEl.style.display = 'flex';
  waveformContainerEl.style.removeProperty('display');
  spectogramContainerEl.style.removeProperty('display');

  // TODO: loader while calculating
};
