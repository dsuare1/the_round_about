'use strict';

const bodyParser = require('body-parser');
// const flash = require('connect-flash');
const express = require('express');
// const expressValidator = require('express-validator');
const exphbs = require('express-handlebars');
const favicon = require('serve-favicon');
// const flash = require('connect-flash');
const logger = require('morgan');
// const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const path = require('path');
// const session = require('express-session'); 

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

// middleware for serving static files
app.use('/', express.static('public'));
app.use('/browse', express.static('public'));

// log requests to the command-line terminal
app.use(logger('dev'));

// middleware for express stssion
// const secret = require('./expSessionSecret.js');
// app.use(session({
// 	secret: secret.expSessionSecret.secret,
// 	saveUninitialized: true,
// 	resave: true
// }));

// app.use(expressValidator({
// 	errorFormatter: (param, msg, value) => {
// 		var namespace = param.split('.')
// 		, root = namespace.shift()
// 		, formParam = root;

// 		while(namespace.length) {
// 			formParam += '[' + namespace.shift + ']';
// 		}
// 		return {
// 			param: formParam,
// 			msg: msg,
// 			value: value
// 		};
// 	}
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// middleware for flash messages
// app.use(flash());
// app.use((req, res, next) => {
// 	res.locals.success_msg = req.flash('success_msg');
// 	res.locals.error_msg = req.flash('error_msg');
// 	res.locals.error = req.flash('error');
// });

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

// if (process.env.NODE_ENV === 'development') {
	// console.log('Node environment is development');
	// connect to localhost MongoDB
	// mongoose.connect('mongodb://localhost/the_round_about');
// } else if (process.env.NODE_ENV === 'production') {
	// console.log('Node environment is production');
	// connect to livehost MongoDB
	mongoose.connect('mongodb://heroku_7jnkclkj:bh42qjgiavnprbks5r97eujt6b@ds043714.mlab.com:43714/heroku_7jnkclkj');
// };

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