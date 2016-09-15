const express = require('express');
const router = express.Router();

// load instances of each controller object constructor 
// loginController(router, models);

router.get('/', function(req, res) {
	res.sendFile('index.html');
})

console.log('Controller loaded --> Centralized controller (tra-central-controller.js)');

module.exports = router;