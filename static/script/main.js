//file upload stuff
const fileSelector = document.getElementById('file');
fileSelector.addEventListener('change', (event) => {
  const fileList = event.target.fileList;
});


var wavesurfer = WaveSurfer.create({
container: '#waveform',
waveColor: '#D2EDD4',
progressColor: '#46B54D',
barHeight: 1.4
});
wavesurfer.on('ready', function () {
var spectrogram = Object.create(WaveSurfer.Spectrogram);
spectrogram.init({
  wavesurfer: wavesurfer,
  container: "#wave-spectrogram",
  fftSamples: 1024,
  labels: true
});
});

var minimap;
      wavesurfer.on('ready', function () {
      minimap = wavesurfer.initMinimap({
      height: 30,
      waveColor: '#ddd',
      progressColor: '#999',
      cursorColor: '#68A93D',
      barHeight: 1.4
      });
      });
      
      
      wavesurfer.load("static/audio/proccessed.wav")


var wavesurfer_original = WaveSurfer.create({
container: '#waveform',
waveColor: '#D2EDD4',
progressColor: '#46B54D',
barHeight: 1.4 
});

var minimap;
      wavesurfer_original.on('ready', function () {
      minimap = wavesurfer_original.initMinimap({
      height: 30,
      waveColor: '#ddd',
      progressColor: '#999',
      cursorColor: '#68A93D',
      hideScrollbar: true,
      barHeight: 1.4
      });
      });
      
      
      
      wavesurfer_original.load("static/audio/original.wav")
      wavesurfer_original.setVolume(0)
function run(){
wavesurfer.playPause()
wavesurfer_original.playPause()
}
wavesurfer.on('seek', position => {
  // Dont emit seek event
  wavesurfer_original.setDisabledEventEmissions(['seek'])

  wavesurfer_original.seekTo(position);

  // Allow all events to be emitted again
  wavesurfer_original.setDisabledEventEmissions([])
});
wavesurfer_original.on('seek', position => {
  // Dont emit seek event
  wavesurfer.setDisabledEventEmissions(['seek'])

  wavesurfer.seekTo(position);

  // Allow all events to be emitted again
  wavesurfer.setDisabledEventEmissions([])
});





      