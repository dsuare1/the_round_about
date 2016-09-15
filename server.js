'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(process.cwd() + '/public'));
app.use('/public', express.static('public'));

app.use(bodyParser.urlencoded({
	extended: false
}));

const routes = require('./controllers/tra-central-controller.js');
app.use('/', routes);

app.listen(process.env.PORT || 3000, function() {
	if (process.env.PORT == undefined) {
		console.log('server listening on port 3000');
	} else {
    	console.log('server listening on port: ' + process.env.PORT);
    }
});