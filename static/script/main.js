//file upload stuff
const fileSelector = document.getElementById("file");
fileSelector.addEventListener("change", (event) => {
  const fileList = event.target.fileList;
});

WaveSurfer.util
        .fetchFile({ url: './static/script/colordata.json', responseType: 'json' })
        .on('success', colorMap => {
            initAndLoadSpectrogram(colorMap);
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
  plugins: [
    WaveSurfer.spectrogram.create({
        wavesurfer: wavesurfer,
        container: "#wave-spectrogram",
        labels: true,
        
    })
]
  
 
});

//wavesurfer.on('ready', function () {
  //var spectrogram = Object.create(WaveSurfer.Spectrogram);
  //spectrogram.init({
   // wavesurfer: wavesurfer,
   // container: "#wave-spectrogram",
   // fftSamples: 1024,
   // labels: true
  //});
//});



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
  plugins: [
    WaveSurfer.spectrogram.create({
      wavesurfer_original: wavesurfer_original,
        container: "#wave-spectrogram2",
        labels: true,
        
    })
]
  
});


var slider = document.getElementById('zoom-slider');

slider.addEventListener('input', wavesurfer.util.debounce(function () {
  wavesurfer.zoom(Number(this.value))
  wavesurfer_original.zoom(Number(this.value));
}, 100));

wavesurfer_original.load("static/audio/original.wav");
wavesurfer_original.setVolume(0);
function UpdateStatus() {
  if (wavesurfer.isPlaying() || wavesurfer_original.isPlaying()){
    
    wavesurfer.pause();
    wavesurfer_original.pause();
    wavesurfer.load("static/audio/proccessed.wav");
    wavesurfer.on('ready', function () {
      wavesurfer.play(wavesurfer_original.getCurrentTime());
      wavesurfer_original.play();
  });

  }
  else{
    wavesurfer.load("static/audio/proccessed.wav");
  }
}
function play(){
  if (wavesurfer.isPlaying() || wavesurfer_original.isPlaying()){
    wavesurfer.pause();
    wavesurfer_original.pause();
  }
  else{
    wavesurfer_original.play();
    wavesurfer.play(wavesurfer_original.getCurrentTime());
    
  }
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

