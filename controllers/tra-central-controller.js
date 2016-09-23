'use strict';

const express = require('express');
const mongoose = require('mongoose');
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

module.exports = router;