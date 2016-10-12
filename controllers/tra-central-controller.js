'use strict';

const express = require('express');
const mongoose = require('mongoose');

const api_key = 'key-813d06ee3d1d178274bee4ceab8dab94';
const domain = 'mg.theroundaboutstore.com';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

const router = express.Router();

const Albums = require('../models/Album.js');

console.log('Controller loaded --> Centralized controller (tra-central-controller.js)');

// load instances of each controller object constructor 
const searchController = require('./tra-search-controller.js');
const eventsController = require('./tra-events-controller.js');
const apiController = require('./tra-api-controller.js');
searchController(router);
eventsController(router);
apiController(router);

router.get('/', (req, res) => {
	Albums.find({ isStaffPick: true }, (err, staffPicks) => {
		if (err) {
			console.log(err);
		} else {
			var staffPicks = { staffPicks: staffPicks };
			res.status(200).render('index', staffPicks);
		}
	});
});

router.get('/contact', (req, res) => {
	res.redirect('/');
});

router.post('/contact', (req, res) => {

	// let mailOptions = {
	// 	from: req.body.email,
	// 	to: 'suarez.derrick@gmail.com',
	// 	subject: req.body.subject,
	// 	text: req.body.messageBody
	// };

	var data = {
	  from: req.body.email,
	  to: 'suarez.derrick@gmail.com',
	  subject: req.body.subject,
	  text: req.body.messageBody
	};

	// transporter.sendMail(mailOptions, (err, info) => {
	// 	if (err) {
	// 		console.log(err);
	// 	};
	// 	console.log(info);
	// });

	mailgun.messages().send(data, function (error, body) {
	  console.log(body);
	});

	Albums.find({ isStaffPick: true }, (err, picks) => {
		if (err) {
			console.log(err);
		} else {
			var staffPicks = { picks: picks };
			let message = { message: 'We\'ve received your message!  Thank you for contacting The Round About!' };
			res.status(200).render('index', {
				message: message,
				picks: picks
			});
		}
	});
});

module.exports = router;