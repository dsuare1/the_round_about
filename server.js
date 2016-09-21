'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const exphbs = require('express-handlebars');
const logger = require('morgan');
const mongoose = require('mongoose');

const app = express();

// middleware for parsing incoming body requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// log requests to the command-line terminal
app.use(logger('dev'));

// set up the views engine to be express-andlebars
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

const htmlRoutes = require('./controllers/tra-central-controller.js');
// const apiRoutes = require('./controllers/tra-api-controller.js');
app.use('/', htmlRoutes);
// app.use('/api', apiRoutes);

// middleware for serving static files
app.use(express.static(process.cwd() + '/public'));
app.use('/public', express.static('public'));

// connect to localhost MongoDB
mongoose.connect('mongodb://localhost/the_round_about');
// connect to livehost MongoDB
// mongoose.connect('mongodb://heroku_srjs9x0w:p8ll25jpbsgqbu85vh0rsn74bm@ds017256.mlab.com:17256/heroku_srjs9x0w');
const db = mongoose.connection;

// show any mongoose errors
db.on('error', (err) => {
  console.log('Mongoose error: ', err);
});

// once connected to the db through mongoose, log a success message
db.once('open', () => {
  console.log('Successfully connected to Mongoose!');
});

app.listen(process.env.PORT || 3000, () => {
	if (process.env.PORT == undefined) {
		console.log('server listening on port 3000');
	} else {
    	console.log('server listening on port: ' + process.env.PORT);
    }
});