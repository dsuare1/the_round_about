'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();

// middleware for parsing incoming body requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

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

app.listen(process.env.PORT || 3000, function() {
	if (process.env.PORT == undefined) {
		console.log('server listening on port 3000');
	} else {
    	console.log('server listening on port: ' + process.env.PORT);
    }
});