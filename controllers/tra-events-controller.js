'use strict';

const exphbs = require('express-handlebars');

// const hbs = exphbs.create({
//     helpers: {
//         if_eq: (a, b, opts) => { 
//         	if (a == b) {
// 		        return opts.fn(this);
// 		    } else {
// 		        return opts.inverse(this);
// 		    }
//         }
//     }
// });

const Events = require('../models/Event.js');

module.exports = (router) => {
	console.log('Controller loaded --> Events controller (tra-search-controller.js)');

	router.get('/events', (req, res) => {
		Events.find({}, (err, events) => {
			if (err) {
				console.log(err);
			} else {
				console.log(events);
				var events = { events: events };
				res.status(200).render('events', { events, helpers: {
				        if_eq: (a, b, opts) => { 
				        	if (a == b) {
						        return opts.fn(this);
						    } else {
						        return opts.inverse(this);
						    }
				        }
					} 
				});
			}
		});
	});
	
}