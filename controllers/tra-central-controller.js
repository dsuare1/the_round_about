const express = require('express');
const router = express.Router();

console.log('Controller loaded --> Centralized controller (tra-central-controller.js)');

// load instances of each controller object constructor 
// loginController(router, models);
var searchController = require('./tra-search-controller.js');

searchController(router);

router.get('/', function(req, res) {
	res.render('index');
});

router.get('/browse', function(req, res) {
	res.render('browse');
});

router.get('/events', function(req, res) {
	res.render('events');
});

module.exports = router;