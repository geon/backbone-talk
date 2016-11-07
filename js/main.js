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


var Clickies = Backbone.Collection.extend({
	model: Clicky
});


var ClickiesView = Backbone.View.extend({

	events: {
		'click button.add-clicky': 'onClick'
	},

	onClick: function () {

		var clicky = new Clicky();
		this.collection.add(clicky);
	},

	initialize: function () {

		this.listenTo(this.collection, 'add', this.onAdd, this);
		this.collection.each(this.onAdd, this);

		var addButton = document.createElement('button');
		addButton.innerText = 'Add Clicky';
		addButton.className = 'add-clicky';
		this.el.appendChild(addButton);
	},

	onAdd: function (model) {

		var clickyView = new ClickyView({
			model: model
		});
		this.el.appendChild(clickyView.el);
	}
});


var body = document.getElementsByTagName('body')[0];

var clickies = new Clickies();

var clickiesView = new ClickiesView({
	el: body,
	collection: clickies
});
