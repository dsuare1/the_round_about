'use strict';

// const bcrypt = require('bcryptjs');
// const passport = require('passport');
var bcrypt = require('bcrypt');
var saltRounds = 10;
const Promise = require('bluebird');

const Album = require('../models/Album.js');
const Event = require('../models/Event.js');
const User = require('../models/User.js');

// config for bcrypt
// const salt = bcrypt.genSaltSync(10);
// const hash = bcrypt.hashSync('B4c0/\/', salt);

module.exports = (router) => {
	console.log('Controller loaded --> API controller (tra-api-controller.js');

	router.get('/api', (req, res) => {
		res.render('api-login');
	});

	router.post('/api/register', (req, res) => {
		console.log(req.body);
		var username = req.body.username;
		var password = req.body.password;
		User.findOne({ where: { username: username } }).then(function(duplicateUser) {
            if (duplicateUser) {
                console.log('email already taken');
                res.redirect('/api');
            } else {
                var hashedPassword = bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                    if (err) {
                        throw err;
                    } else {
                        var hashedPassword = hash;
                    };
                    User.create({
                        username: username,
                        password: hashedPassword
                    }).then(function(result) {
                        res.redirect('/api-admin');
                    });
                })
            }
        })
	});

	router.get('/api-admin', (req, res) => {
		res.render('api-admin');
	})
};