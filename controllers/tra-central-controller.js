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
	// res.status(200).render('index', fetchStaffPicks());
});

router.get('/contact', (req, res) => {
	res.redirect('/');
});

router.post('/contact', (req, res) => {

	let mailOptions = {
		from: req.body.email,
		to: 'roundaboutstore@gmail.com',
		subject: req.body.subject,
		text: req.body.messageBody
	}

	console.log(mailOptions);

	transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			console.log(err);
		};
	});

	Albums.find({ isStaffPick: true }, (err, picks) => {
		if (err) {
			console.log(err);
		} else {
			var staffPicks = { picks: picks };
			console.log(picks);
			let message = { message: 'We\'ve received your message!  Thank you for contacting The Round About!' };
			res.status(200).render('index', {
				message: message,
				picks: picks
			});
		}
	});
});

// function fetchStaffPicks() {
// 	Albums.find({ isStaffPick: true }, (err, staffPicks) => {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			var staffPicks = { staffPicks: staffPicks };
// 			console.log(staffPicks);
// 			return staffPicks;
// 			// res.status(200).render('index', staffPicks);
// 		}
// 	});
// }

module.exports = router;