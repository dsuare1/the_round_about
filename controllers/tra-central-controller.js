'use strict';

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Albums = require('../models/Album.js');
const Events = require('../models/Event.js');

console.log('Controller loaded --> Centralized controller (tra-central-controller.js)');

// load instances of each controller object constructor 
// loginController(router, models);
const searchController = require('./tra-search-controller.js');

searchController(router);

router.get('/', (req, res) => {
	Albums.find({ isStaffPick: true }, (err, staffPicks) => {
		if (err) {
			console.log(err);
		} else {
			var staffPicks = { staffPicks: staffPicks }
			console.log(staffPicks);
			res.status(200).render('index', staffPicks);
		}
	});
});

router.get('/browse', (req, res) => {
	res.status(200).render('browse');
});

router.get('/events', (req, res) => {
	res.status(200).render('events');
});

module.exports = router;