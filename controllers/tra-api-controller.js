'use strict';

const cookieParser = require('cookie-parser');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const Promise = require('bluebird');

// const database = require('./database.js');

const Album = require('../models/Album.js');
const Event = require('../models/Event.js');
const User = require('../models/User.js');

module.exports = (router) => {
    console.log('Controller loaded --> API controller (tra-api-controller.js');

    router.get('/api', (req, res) => {
        if (req.cookies.loggedIn) {
            res.clearCookie('loggedIn');
        };
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
                        loggedIn = true;
                        res.redirect('/api-admin');
                    });
                })
            }
        })
    });

    router.post('/api/login', (req, res) => {
        console.log('login button hit');
        console.log(req.body);
        let username = req.body.username;
        User.find({ username: username }).then((loginUser) => {
            console.log(loginUser);
            console.log(loginUser[0]);
            // console.log(loginUser[0].username);
            if (loginUser[0] === undefined) {
                console.log('no such user');
                // res.redirect('/api');
                // I want the below to happen; but it's giving me a starnge 'router.post (line 24) is not a function' error; ??
                res.render('api-login', { errorMsg: 'No such user found in the database' });
            } else {
                console.log('user in database');
                bcrypt.compare(req.body.password, loginUser[0].password, (err, result) => {
                    if (result === true) {
                        res.cookie('loggedIn', 'true', { maxAge: 900000, httpOnly: true });
                        res.redirect('/api-admin');
                    } else {
                        res.render('api-login', { invalidLogin: 'Username or Password was incorrect; try again' });
                    }
                });
            }
        });
    });

    router.get('/api-admin', (req, res) => {
        console.log(req.headers);
        console.log(req.cookies);
        if (!req.cookies.loggedIn) {
            res.render('api-login', { errorMsg: 'You must be logged in to access that page' });
        } else {
            res.render('api-admin');
        }
    });

    router.post('/api-admin/logout', (req, res) => {
        res.redirect('/api');
    });

    // /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-
    // Database CRUD for owners and webmaster (Albums)
    // /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-

    router.get('/api-admin/albums/search/all', (req, res) => {
        console.log('search entire database');
        Album.find({})
            .sort({ artist: 1 })
            .exec((err, albums) => {
                if (err) {
                    console.log(err);
                } else {
                    var albums = { albums: albums };
                    res.render('api-admin', albums);
                }
            })
    });

    router.get('/api-admin/albums/search', (req, res) => {
        console.log('search for specific item');
        console.log(req.query);
        let query = {};
        if (req.query.artist !== '') {
            query['artist'] = req.query.artist;
        };
        if (req.query.title !== '') {
            query['title'] = req.query.title;
        };
        if (req.query.year !== '') {
            query['year'] = req.query.year;
        };
        if (req.query.genre !== '') {
            query['genre'] = req.query.genre;
        };
        if (req.query.format !== '') {
            query['format'] = req.query.format;
        };
        if (req.query.quantity !== '') {
            query['quantity'] = req.query.quantity;
        };
        if (req.query.isStaffPick !== '') {
            query['isStaffPick'] = req.query.isStaffPick;
        };
        console.log(query);
        Album.find(query)
            .sort({ artist: 1 })
            .exec((err, albums) => {
                if (err) {
                    console.log(err);
                } else if (albums[0] === undefined) {
                    console.log('foo');
                    res.render('api-admin', { noResMessage: 'Looks like there isn\'t anything in the database matching your query; try again.'});
                } else {
                    var albums = { albums: albums };
                    console.log(albums);
                    res.render('api-admin', albums);
                }
            })
    });

    router.post('/api-admin/albums/create', (req, res) => {
        console.log('create new entry');
        console.log(req.body);
        // var newAlbum = Album({
        //     artist: req.body.artist,
        //     title: req.body.title,
        //     year: req.body.year,
        //     genre: req.body.genre,
        //     price: req.body.price,
        //     format: req.body.format,
        //     imgURL: req.body.imgURL,
        //     quantity: req.body.quantity,
        //     isStaffPick: req.body.isStaffPick
        // })

        // newAlbum.save((err) => {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         console.log('User created!');
        //     }
        // });
    });

    router.put('/api-admin/albums/update/:id', (req, res) => {
        console.log('update a specific item');
        console.log('updating item: ' + req.params.id);
        // console.log(req.body);
        let query = {};
        if (req.body.artist !== undefined) {
            query['artist'] = req.body.artist;
        };
        if (req.body.title !== undefined) {
            query['title'] = req.body.title;
        };
        if (req.body.year !== undefined) {
            query['year'] = req.body.year;
        };
        if (req.body.genre !== undefined) {
            query['genre'] = req.body.genre;
        };
        if (req.body.format !== undefined) {
            query['format'] = req.body.format;
        };
        if (req.body.quantity !== undefined) {
            query['quantity'] = req.body.quantity;
        };
        if (req.body.isStaffPick !== undefined) {
            query['isStaffPick'] = req.body.isStaffPick;
        };
        console.log('query: ' + JSON.stringify(query, null, 2));

        Album.findOneAndUpdate({ _id: req.params.id }, query, { upsert: true }, (err, doc) => {
            if (err) {
                console.log(err);
            } else {
                console.log(doc);
                res.redirect('/api-admin/albums/search/all');
            }
        })
    });

    router.delete('/api-admin/albums/delete/:id', (req, res) => {
        console.log('delete a specific item');
        console.log('deleting item: ' + req.params.id);
    });

    // /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-
    // Database CRUD for owners and webmaster (Events)
    // /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-

    router.get('/api-admin/events/search/all', (req, res) => {
        console.log('search entire database');
    });

    router.get('/api-admin/events/search/:id', (req, res) => {
        console.log('search for specific item');
    });

    router.post('/api-admin/events/create', (req, res) => {
        console.log('create new entry');
    });

    router.put('/api-admin/events/update/:id', (req, res) => {
        console.log('update a specific item');
    });

    router.delete('/api-admin/events/delete/:id', (req, res) => {
        console.log('delete a specific item');
    });
};
