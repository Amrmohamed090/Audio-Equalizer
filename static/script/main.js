//file upload stuff
const fileSelector = document.getElementById("file");
fileSelector.addEventListener("change", (event) => {
  const fileList = event.target.fileList;
});

var wavesurfer = WaveSurfer.create({
  // Use the id or class-name of the element you created, as a selector
  container: "#waveform",
  // The color can be either a simple CSS color or a Canvas gradient
  waveColor: "grey",
  progressColor: "hsla(200, 100%, 30%, 0.5)",
  cursorColor: "#fff",
  // This parameter makes the waveform look like SoundCloud's player
  barWidth: 3,
});
wavesurfer.on("ready", function () {
  var spectrogram = Object.create(WaveSurfer.Spectrogram);
  spectrogram.init({
    wavesurfer: wavesurfer,
    container: "#wave-spectrogram",
    fftSamples: 1024,
    labels: true,
    overflow: hidden
  });
});

var minimap;
wavesurfer.on("ready", function () {
  minimap = wavesurfer.initMinimap({
    height: 30,
    waveColor: "#ddd",
    progressColor: "#999",
    cursorColor: "#68A93D",
    barHeight: 1.4,
    overflow: hidden
  });
  
});

wavesurfer.load("static/audio/proccessed.wav");

var wavesurfer_original = WaveSurfer.create({
  // Use the id or class-name of the element you created, as a selector
  container: "#waveform",
  // The color can be either a simple CSS color or a Canvas gradient
  waveColor: "grey",
  progressColor: "hsla(200, 100%, 30%, 0.5)",
  cursorColor: "#fff",
  // This parameter makes the waveform look like SoundCloud's player
  barWidth: 3,
  
  
});

var minimap;
wavesurfer_original.on("ready", function () {
  minimap = wavesurfer_original.initMinimap({
    height: 30,
    waveColor: "#ddd",
    progressColor: "#999",
    cursorColor: "#68A93D",
    hideScrollbar: true,
    barHeight: 1.4,
    
  });
});
var slider = document.getElementById('zoom-slider');

slider.addEventListener('input', wavesurfer.util.debounce(function () {
  wavesurfer.zoom(Number(this.value))
  wavesurfer_original.zoom(Number(this.value));
}, 100));

wavesurfer_original.load("static/audio/original.wav");
wavesurfer_original.setVolume(0);
function run() {
  wavesurfer.load("static/audio/proccessed.wav");
  wavesurfer.playPause();
  wavesurfer_original.playPause();
}





wavesurfer.on("seek", (position) => {
  // Dont emit seek event
  wavesurfer_original.setDisabledEventEmissions(["seek"]);

  wavesurfer_original.seekTo(position);

  // Allow all events to be emitted again
  wavesurfer_original.setDisabledEventEmissions([]);
});
wavesurfer_original.on("seek", (position) => {
  // Dont emit seek event
  wavesurfer.setDisabledEventEmissions(["seek"]);

  wavesurfer.seekTo(position);

  // Allow all events to be emitted again
  wavesurfer.setDisabledEventEmissions([]);
});



var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}
