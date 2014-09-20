var tinaja = document.getElementById('tinaja');

setInterval(function() {
	var scale = 1 + 3 * Math.random();
	scaleTinaja(scale);
}, 100);


function scaleTinaja(value) {
	var scale = (value * 1.0).toFixed(2);
	var invPerc = ((100.0 / scale).toFixed(2)) + '%';
	tinaja.style.transform = 'translate(100%, 100%) scale(' + scale + ')';
}
