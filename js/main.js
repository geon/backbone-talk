"use strict";

var ClickyView = Backbone.View.extend({

	tagName: 'button',

	events: {
		'click': 'updateView'
	},

	updateView: function () {

		this.$el.text('Num clicks: 1');
	}
});



var body = document.getElementsByTagName('body')[0];

var clickyView = new ClickyView();
body.appendChild(clickyView.el);
