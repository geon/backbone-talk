"use strict";

var ClickyView = Backbone.View.extend({

	tagName: 'button',

	events: {
		'click': 'onClick'
	},


	onClick: function () {

		this.model.click();
	},

	initialize: function (options) {

		this.listenTo(this.model, 'change', this.updateView, this);
		this.updateView();
	},

	updateView: function () {

		this.$el.text('Num clicks: '+this.model.get('count'));
	}
});


var Clicky = Backbone.Model.extend({

	defaults: {
		count: 0
	},

	click: function () {

		this.set('count', this.get('count') + 1);
	}
});


var body = document.getElementsByTagName('body')[0];

var clicky = new Clicky();
var clickyView = new ClickyView({
	model: clicky
});
body.appendChild(clickyView.el);

setInterval(function () {
	clicky.click();
}, 2000);
