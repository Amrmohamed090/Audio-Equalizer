//selecting all required elements

var wavesurfer = WaveSurfer.create({
  // Use the id or class-name of the element you created, as a selector
  container: "#waveform",
  // The color can be either a simple CSS color or a Canvas gradient
  waveColor: "grey",
  progressColor: "hsla(200, 100%, 30%, 0.5)",
  cursorColor: "#fff",
  overflow: "hidden",
  // This parameter makes the waveform look like SoundCloud's player
  barWidth: 3,
  plugins: [
    WaveSurfer.spectrogram.create({
        wavesurfer: wavesurfer,
        container: "#wave-spectrogram",
        labels: true,
        
    }),
    WaveSurfer.regions.create({})
]
  
 
});
WaveSurfer.util
.fetchFile({ url: './static/script/colordata.json', responseType: 'json' })
.on('success', colorMap => {

    initAndLoadSpectrogram(colorMap);
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
  overflow: "hidden",
  // This parameter makes the waveform look like SoundCloud's player
  barWidth: 3,
  plugins: [
    WaveSurfer.spectrogram.create({
      wavesurfer_original: wavesurfer_original,
        container: "#wave-spectrogram2",
        labels: true,
        
    })
    ,
    WaveSurfer.regions.create({})
]
});
WaveSurfer.util
.fetchFile({ url: './static/script/colordata.json', responseType: 'json' })
.on('success', colorMap => {

    initAndLoadSpectrogram(colorMap);
});
//responsive code starts
figurs = [wavesurfer,wavesurfer_original]
for (var i; i<2; i++){
const resizeObserver = new ResizeObserver(entries => {
  for (let entry of entries) {
     wavesurfer[i].empty();
     wavesurfer[i].drawBuffer();
       var regs = Object.values(wavesurfer[i].regions.list);
       window.setTimeout(() => {
           wavesurfer[i].regions.clear();
           var clear = ({start,end,resize,drag,loop,color}) =>({start,end,resize,drag,loop,color})
         regs.forEach(e => wavesurfer[i].addRegion(clear(e)));
       }, 100);
     
     
  }
});

wavesurfer[i].enableDragSelection({
  drag: false,
  slop: 1,
  loop : false,
});

wavesurfer[i].on('region-updated', function (region) {
  console.log(region.start, region.end);
});


wavesurfer[i].on('ready', function (readyObj) {
        resizeObserver.observe($('.visuals')[0])
        wavesurfer[i].addRegion({
            start: 0, // time in seconds
            end: wavesurfer[i].getDuration(), // time in seconds
            color: 'hsla(100, 100%, 30%, 0.1)',
            loop: false,
            multiple: false,
            drag: false
        });
})




document.querySelectorAll('wave').forEach(function(wave){
      wave.addEventListener('mousedown', function(e) {
        e.preventDefault();
        wavesurfer[i].clearRegions();
      });
  });




$(document).on('click','.toggle-width',function(){
   console.log('clicked');
   var width = $('.visuals').width();
   width = width - 120;
   $('.visuals').width(width + 'px');
   // you can put here implementation of our redraw.
});

}
//responsive code ends

var slider = document.getElementById('zoom-slider');

slider.addEventListener('click', wavesurfer.util.debounce(function () {
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

function change_speed(){
  rate = document.getElementById("playback-slider").value
  if (wavesurfer.isPlaying() || wavesurfer_original.isPlaying()){
    wavesurfer.pause();
    wavesurfer_original.pause();
    wavesurfer.setPlaybackRate(Number(rate));
    wavesurfer_original.setPlaybackRate(Number(rate));
    wavesurfer.play(wavesurfer_original.getCurrentTime());
    wavesurfer_original.play();
  }
  else{
    wavesurfer.setPlaybackRate(Number(rate));
    wavesurfer_original.setPlaybackRate(Number(rate));
    
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
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

$('#file-upload').bind('change', function() 
{ var fileName = ''; 
fileName = $(this).val(); 
console.log(fileName)
$('#file-selected').html(fileName); 
})