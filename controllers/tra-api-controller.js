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

    var loggedIn = false;

    router.get('/api', (req, res) => {
        res.render('api-login');
    });

    router.post('/api/register', (req, res) => {
        console.log(req.body);
        var username = req.body.username;
        var password = req.body.password;
        User.findOne({ username: username }).then((duplicateUser) => {
            if (duplicateUser) {
                console.log('username already taken');
                res.redirect('/api');
            } else {
                var hashedPassword = bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                    if (err) {
                        throw err;
                    } else {
                        var hashedPassword = hash;
                    };
                    User.create({
                        username: username,
                        password: hashedPassword
                    }).then((result) => {
                        res.redirect('/api-admin');
                    });
                })
            }
        })
    });

    router.post('/api/login', (req, res) => {
        console.log('login button hit');
        console.log(req.body);
        var username = req.body.username;
        User.find({ username: username }).then((loginUser) => {
            console.log(loginUser[0]);
            // console.log(loginUser[0].username);
            if (loginUser[0] === undefined) {
                console.log('no such user');
                res.redirect('/api');
            } else {
                console.log('user in database');
                bcrypt.compare(req.body.password, loginUser[0].password, (err, result) => {
                    if (result === true) {
                        loggedIn = true;
                        console.log('login successful');
                        console.log('loggedIn variable is: ' + loggedIn);
                        res.redirect('/api-admin');
                    } else {
                        res.render('api-login', { invalidLogin: 'Username or Password was incorrect; try again' });
                    }
                });
            }
        });
    });

    router.get('/api-admin', (req, res) => {
        console.log('loggedIn variable is: ' + loggedIn);
        if (loggedIn === false) {
            res.render('api-login', { errorMsg: 'You must be logged in to access that page' });
        } else {
            res.render('api-admin');
        }
    });

    router.post('/api-admin/logout', (req, res) => {
        loggedIn = false;
        res.redirect('/api');
        console.log('loggedIn variable is: ' + loggedIn);
    })
};
