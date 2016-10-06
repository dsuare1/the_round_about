'use strict';

const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const router = express.Router();
const transporter = nodemailer.createTransport();

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

router.post('/contact', (req, res) => {
	console.log('send mail button hit');
	console.log(req.body);
	let mailOptions = {
		from: req.body.email,
		// to: 'roundaboutstore@gmail.com',
		to: 'suarez.derrick@gmail.com',
		subject: req.body.subject,
		text: req.body.messageBody
	}

	console.log(mailOptions);

	transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			console.log(err);
		};
		console.log('Message sent: ' + info.response);
	});

	// let emailSuccessMessage = { message: 'We\'ve received your message!  Thank you for contacting The Round About!' };
	// res.status(200).render('index', emailSuccessMessage);
	res.redirect('/');
});

module.exports = router;