'use strict';

const exphbs = require('express-handlebars');

const Events = require('../models/Event.js');

module.exports = (router) => {
	console.log('Controller loaded --> Events controller (tra-events-controller.js)');

	router.get('/events', (req, res) => {
		Events.find({}, (err, events) => {
			if (err) {
				console.log(err);
			} else {
				var events = { events: events };
				res.status(200).render('events', events);
			}
		});
	});
};