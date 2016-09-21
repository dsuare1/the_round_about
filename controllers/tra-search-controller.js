'use strict';

const Albums = require('../models/Album.js');

module.exports = (router) => {
	console.log('Controller loaded --> Search controller (tra-search-controller.js)');

	router.get('/browse', (req, res) => {
		res.status(200).render('browse');
	});

	router.get('/browse/search/all', (req, res) => {
		Albums.find({}, (err, albums) => {
			if (err) {
				console.log(err);
			} else {
				var albums = { albums: albums };
				res.render('browse', albums);
			}
		});
	});

	router.get('/browse/search', (req, res) => {
		console.log('browse button hit');
		console.log(req.query);
	});
	
}