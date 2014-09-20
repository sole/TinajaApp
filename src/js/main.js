require('./gumPolyfill.js');

var audioContext;
var audioAnalyser;
var audioGain;
var audioSource;
var tinaja = document.getElementById('tinaja');

/*setInterval(function() {
	var scale = 1 + 3 * Math.random();
	scaleTinaja(scale);
}, 100);*/

init();
startAudioInput();

function init() {
	audioContext = new AudioContext();
	audioAnalyser = audioContext.createAnalyser();
	audioAnalyser.connect(audioContext.destination);
	audioGain = audioContext.createGain();
	audioGain.connect(audioAnalyser);
}

function startAudioInput() {
	navigator.getUserMedia(
		{ audio: true, fake: true },
		function yay(stream) {
			audioSource = audioContext.createMediaStreamSource(stream);
			audioSource.connect(audioGain);
		},
		function nope(err) {
			console.err("oh noes", err);
		}
	);
}

function scaleTinaja(value) {
	var scale = (value * 1.0).toFixed(2);
	var invPerc = ((100.0 / scale).toFixed(2)) + '%';
	tinaja.style.transform = 'translate(100%, 100%) scale(' + scale + ')';
}
