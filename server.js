'use strict';

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const exphbs = require('express-handlebars');
const favicon = require('serve-favicon');
const logger = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');

// adding promises to Mongoose with Bluebird
mongoose.Promise = require('bluebird');

const app = express();

// set up the views engine to be express-andlebars
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// middleware for serving favicon
app.use(favicon(path.join(__dirname, 'public', 'tra-logo.ico')));
// middleware for parsing incoming body requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// cookie parser
app.use(cookieParser());

// hack the form methods to be more than GET and POST
app.use(methodOverride('_method'));

// middleware for serving static files
app.use('/', express.static('public'));
app.use('/browse', express.static('public'));
app.use('/events', express.static('public'));
app.use('/api', express.static('public'));
app.use('/api-admin', express.static('public'));
app.use('/api-admin/albums', express.static('public'));
app.use('/api-admin/events', express.static('public'));
app.use('/api-admin/albums/search', express.static('public'));
app.use('/api-admin/albums/create', express.static('public'));
app.use('/api-admin/albums/update', express.static('public'));
app.use('/api-admin/albums/delete', express.static('public'));
app.use('/api-admin/events/search', express.static('public'));
app.use('/api-admin/events/create', express.static('public'));
app.use('/api-admin/events/update', express.static('public'));
app.use('/api-admin/events/delete', express.static('public'));

// log requests to the command-line terminal
app.use(logger('dev'));

const htmlRoutes = require('./controllers/tra-central-controller.js');
const apiRoutes = require('./controllers/tra-api-controller.js');
app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// connect to localhost MongoDB
// mongoose.connect('mongodb://localhost/the_round_about');

// connect to livehost MongoDB
mongoose.connect('mongodb://heroku_7jnkclkj:bh42qjgiavnprbks5r97eujt6b@ds043714.mlab.com:43714/heroku_7jnkclkj');

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

// export the database for use in 'database.js' helpers file
module.exports = db;