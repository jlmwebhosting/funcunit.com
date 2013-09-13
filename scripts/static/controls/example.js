can.Control('Bitovi.OSS.Example', {
	init: function() {
		this.setHeight($(window));

		this.content = this.element.find('.content');
		this.content.html(can.view('docs/static/templates/example/qunit.mustache', {}));
	},

	'{window} resize': function(el) {
		this.setHeight(el);
	},

	'li.tab click': function(el, ev) {
		this.element.find('li.tab').removeClass('selected');
		el.addClass('selected');

		if(el.text() === 'QUnit') {
			this.content.html(can.view('docs/static/templates/example/qunit.mustache', {}));
		}
		else {
			this.content.html(can.view('docs/static/templates/example/jasmine.mustache', {}));
		}
	},

	setHeight: function(el) {
		this.element.height(el.height());
	}

});