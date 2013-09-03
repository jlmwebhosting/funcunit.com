can.Control('Bitovi.OSS.Runner', {
	init: function() {},

	'click': function(el, ev) {
		ev.preventDefault();

		if(!this.started) {
			//starting QUnit, we'll need to refactor this when we have tabs for other frameworks
			this.options.frame.contentWindow.QUnit.start();
			this.started = true;
		}
		else {
			//clears the ?init flag which is used to stop the tests from running only on initial page load
			this.options.frame.contentWindow.location = this.options.frame.contentWindow.location.pathname;
		}
	}

});