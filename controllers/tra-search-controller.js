'use strict';

const Albums = require('../models/Album.js');

module.exports = (router) => {
	console.log('Controller loaded --> Search controller (tra-search-controller.js)');

	router.get('/browse', (req, res) => {
		res.status(200).render('browse');
	});

	router.get('/browse/all', (req, res) => {
		Albums.find({})
			.sort({ artist: 1 })
			.exec((err, albums) => {
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
		console.log(req.query.condition);
		console.log(req.query.format);
		console.log(req.query.genre);

		// no filters provided
		if (req.query.condition === undefined && req.query.format === undefined && req.query.genre === undefined) {
			console.log('no filters provided');
			Albums.find({})
				.sort({ artist: 1 })
				.exec((err, albums) => {
				if (err) {
					console.log(err);
				} else {
					var albums = { albums: albums };
					res.render('browse', albums);
				}
			});
		}

		// only condition filter provided
		if (req.query.format === undefined && req.query.genre === undefined && req.query.condition !== undefined) {
			console.log(req.query);
			console.log('only condition filter provided');
			Albums.find({ condition: req.query.condition })
				.sort({ artist: 1})
				.exec((err, albums) => {
				if (err) {
					console.log(err);
				} else {
					console.log(albums);
					var albums = { albums: albums };
					res.status(200).render('browse', albums);
				}
			});
		}

		// only format filter provided
		if (req.query.condition === undefined && req.query.genre === undefined && req.query.format !== undefined) {
			console.log(req.query);
			console.log('only format filter provided');
			Albums.find({ format: req.query.format })
				.sort({ artist: 1 })
				.exec((err, albums) => {
				if (err) {
					console.log(err);
				} else {
					console.log(albums);
					var albums = { albums: albums };
					res.status(200).render('browse', albums);
				}
			});
		}

		// only genre filter provided
		if (req.query.condition === undefined && req.query.format === undefined && req.query.genre !== undefined) {
			console.log(req.query);
			console.log('only genre filter provided');
			Albums.find({ genre: req.query.genre })
				.sort({ artist: 1 })
				.exec((err, albums) => {
				if (err) {
					console.log(err);
				} else {
					console.log(albums);
					var albums = { albums: albums };
					res.status(200).render('browse', albums);
				}
			});
		}

		// both condition and format filters provided
		if (req.query.genre === undefined && req.query.condition !== undefined && req.query.format !== undefined) {
			console.log(req.query);
			console.log('both condition and format filters provided');
			Albums.find({ condition: req.query.condition, format: req.query.format })
				.sort({ artist: 1 })
				.exec((err, albums) => {
				if (err) {
					console.log(err);
				} else {
					console.log(albums);
					var albums = { albums: albums };
					res.status(200).render('browse', albums);
				}
			});
		}

		// both condition and genre filters provided
		if (req.query.format === undefined && req.query.condition !== undefined && req.query.genre !== undefined) {
			console.log(req.query);
			console.log('both condition and genre filters provided');
			Albums.find({ condition: req.query.condition, genre: req.query.genre })
				.sort({ artist: 1 })
				.exec((err, albums) => {
				if (err) {
					console.log(err);
				} else {
					console.log(albums);
					var albums = { albums: albums };
					res.status(200).render('browse', albums);
				}
			});
		}

		// both format and genre filters provided
		if (req.query.condition === undefined && req.query.format !== undefined && req.query.genre !== undefined) {
			Albums.find({ format: req.query.format, genre: req.query.genre })
				.sort({ artist: 1 })
				.exec((err, albums) => {
				if (err) {
					console.log(err);
				} else {
					console.log(albums);
					var albums = { albums: albums };
					res.status(200).render('browse', albums);
				}
			});
		}

		// all three filters provided
		if (req.query.condition !== undefined && req.query.format !== undefined && req.query.genre !== undefined) {
			Albums.find({ condition: req.query.condition, format: req.query.format, genre: req.query.genre })
				.sort({ artist: 1 })
				.exec((err, albums) => {
				if (err) {
					console.log(err);
				} else {
					console.log(albums);
					var albums = { albums: albums };
					res.status(200).render('browse', albums);
				}
			});
		}
	});	
}
