const express = require('express');
const router = express.Router();

// load instances of each controller object constructor 
// loginController(router, models);

router.get('/', function(req, res) {
	res.render('index');
});

router.get('/browse', function(req, res) {
	res.render('browse');
});

router.get('/events', function(req, res) {
	res.render('events');
})

console.log('Controller loaded --> Centralized controller (tra-central-controller.js)');

module.exports = router;