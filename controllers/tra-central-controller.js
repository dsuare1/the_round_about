'use strict';

const express = require('express');
const router = express.Router();

console.log('Controller loaded --> Centralized controller (tra-central-controller.js)');

// load instances of each controller object constructor 
// loginController(router, models);
const searchController = require('./tra-search-controller.js');

searchController(router);

router.get('/', (req, res) => {
	res.status(200).render('index');
});

router.get('/browse', (req, res) => {
	res.status(200).render('browse');
});

router.get('/events', (req, res) => {
	res.status(200).render('events');
});

module.exports = router;