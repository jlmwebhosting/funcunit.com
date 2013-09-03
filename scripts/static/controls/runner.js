can.Control('Bitovi.OSS.Runner', {
	init: function() {},

	'click': function(el, ev) {
		ev.preventDefault();

		//starting QUnit, we'll need to refactor this when we have tabs for other frameworks
		this.options.frame.contentWindow.QUnit.start();
	}

});