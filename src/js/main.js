require('./gumPolyfill.js');

var audioContext;
var audioAnalyser;
var audioAnalyserData;
var audioGain;
var audioSource;
var tinaja = document.getElementById('tinaja');

init();
startAudioInput();

function init() {
	audioContext = new AudioContext();
	audioAnalyser = audioContext.createAnalyser();
	audioAnalyser.fftSize = 2048;
	audioAnalyser.smoothingTimeConstant = 0.8;
	audioAnalyserData = new Uint8Array(audioAnalyser.frequencyBinCount);
	//audioAnalyser.connect(audioContext.destination);
	audioGain = audioContext.createGain();
	audioGain.connect(audioAnalyser);
}

function startAudioInput() {
	navigator.getUserMedia(
		{
			audio: true,
			fake: true
		},
		function yay(stream) {
			audioSource = audioContext.createMediaStreamSource(stream);
			audioSource.connect(audioGain);
			animate();
		},
		function nope(err) {
			console.err('oh noes', err);
		}
	);
}

function scaleTinaja(value) {
	var scale = (value * 1.0).toFixed(2);
	var invPerc = ((100.0 / scale).toFixed(2)) + '%';
	tinaja.style.transform = 'translate(100%, 100%) scale(' + scale + ')';
}

function animate(t) {

	requestAnimationFrame(animate);

	audioAnalyser.getByteFrequencyData(audioAnalyserData);

	var v = audioAnalyserData[0];
	scaleTinaja( 1 + 2 * v/255.0 );

}
