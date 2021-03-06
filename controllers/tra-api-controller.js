'use strict';

const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer({ dest: 'public/assets/img/covers/' });
// const fs = require('fs');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const Promise = require('bluebird');

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
        var username = req.body.username;
        var password = req.body.password;
        User.findOne({ username: username }).then((duplicateUser) => {
            if (duplicateUser) {
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
        let username = req.body.username;
        User.find({ username: username }).then((loginUser) => {
            if (loginUser[0] === undefined) {
                res.render('api-login', { errorMsg: 'No such user found in the database' });
            } else {
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

    // READ - retrieve all albums
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

    // READ - retrieve albums based on filters
    router.get('/api-admin/albums/search', (req, res) => {
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

        Album.find(query)
            .sort({ artist: 1 })
            .exec((err, albums) => {
                if (err) {
                    console.log(err);
                } else if (albums[0] === undefined) {
                    res.render('api-admin', { noResMessage: 'Looks like there isn\'t anything in the database matching your query; try again.' });
                } else {
                    var albums = { albums: albums };
                    res.render('api-admin', albums);
                }
            })
    });

    // CREATE - add new album to the database
    router.post('/api-admin/albums/create', upload.single('albumCover'), (req, res) => {

        console.log(req.body);

        // validation before processing request to database
        return new Promise((resolve, reject) => {
            if (typeof req.body.artist !== 'string' || req.body.artist === '' || req.body.artist === undefined) {
                return reject(new Error('Artist must be provided'));
            };

            if (typeof req.body.title !== 'string' || req.body.title === '' || req.body.title === undefined) {
                return reject(new Error('Title must be provided'));
            };

            if (typeof req.body.year !== 'string' || req.body.year === '' || req.body.year === undefined) {
                return reject(new Error('Year must be provided'));
            };

            if (typeof req.body.genre !== 'string' || req.body.genre === '' || req.body.genre === undefined) {
                return reject(new Error('Genre must be provided'));
            };

            if (req.body.price === '' || req.body.price === undefined) {
                return reject(new Error('Price must be provided and must be a number'));
            };

            if (typeof req.body.format !== 'string' || req.body.format === '' || req.body.format === undefined || req.body.format.length > 2) {
                return reject(new Error('Format must be provided and must be either 7 or 12'));
            };

            if (typeof req.file.path !== 'string' || req.file.path === '' || req.file === undefined) {
                return reject(new Error('Image for album cover must be provided'));
            };

            if ( /* typeof req.body.quantity !== 'number' || */ req.body.quantity === '' || req.body.quantity === undefined) {
                return reject(new Error('Quantity must be provided and must be a number'));
            };

            if (typeof req.body.isStaffPick !== 'string' || req.body.isStaffPick === '' /* || req.body.isStaffPick !== 'true' || req.body.isStaffPick !== 'false' */ ) {
                return reject(new Error('isStaffPick must be provided and must be either "true" or "false"'));
            };

            // let tmp_path = req.file.path;
            // let target_path = 'public/assets/img/covers/' + req.file.originalname;

            // let src = fs.createReadStream(tmp_path);
            // let dest = fs.createWriteStream(target_path);
            // src.pipe(dest);

            // once the request passes all the tests above, a new Album is created
            let newAlbum = Album({
                artist: req.body.artist,
                title: req.body.title,
                year: req.body.year,
                genre: req.body.genre,
                price: req.body.price,
                format: req.body.format,
                albumCover: `https://tra-album-covers.s3.amazonaws.com/${req.file.originalname}`,
                quantity: req.body.quantity,
                isStaffPick: req.body.isStaffPick
            });

            // fs.unlink(tmp_path);

            // if no 'reject' was returned above from validation check, a 'resolve' is returned here
            return resolve(
                // first we check to see if the same album already exists in the database
                Album.find({ artist: req.body.artist, title: req.body.title })
                .then((album) => {
                    // if the album DOES NOT already exist in the database...
                    if (album[0]) {
                        let hbsObj = {
                                message: 'Album already exists in the database',
                                error: {
                                    status: 409,
                                    /* Conflict response - request would conflict with state of server */
                                    stack: JSON.stringify(album, null, 2)
                                }
                            }
                            // ...send error status and message
                        return res.status(409).render('error', hbsObj);
                    } else {
                        newAlbum.save((err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                let createdAlbum = { createdAlbum: newAlbum };
                                res.render('api-admin', createdAlbum);
                            }
                        });
                    }
                }));
        });
    });

    // UPDATE - update data for a specific album
    router.put('/api-admin/albums/update/:id', (req, res) => {
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
        if (req.body.price !== undefined) {
            query['price'] = req.body.price;
        };
        if (req.body.format !== undefined) {
            query['format'] = req.body.format;
        };
        if (req.body.albumCover !== undefined) {
            query['albumCover'] = req.body.albumCover;
        };
        if (req.body.quantity !== undefined) {
            query['quantity'] = req.body.quantity;
        };
        if (req.body.isStaffPick !== undefined) {
            query['isStaffPick'] = req.body.isStaffPick;
        };

        Album.findOneAndUpdate({ _id: req.params.id }, query, { upsert: true }, (err, doc) => {
            if (err) {
                console.log(err);
            } else {
                Album.findOne({ _id: doc.id }, (err, doc) => {
                    let updatedAlbum = { updatedAlbum: doc };
                    res.render('api-admin', updatedAlbum);
                })
            }
        })
    });

    // DELETE - delete an album from the database (built-in user-error check; can re-add album if deletion was a mistake)
    router.delete('/api-admin/albums/delete/:id', (req, res) => {
        Album.findOneAndRemove({ _id: req.params.id }, (err, doc) => {
            if (err) {
                console.log(err);
            } else {
                let deletedAlbum = { deletedAlbum: doc }
                res.render('api-admin', deletedAlbum);
            }
        })
    });

    // /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-
    // Database CRUD for owners and webmaster (Events)
    // /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-

    // READ - retrieve all events
    router.get('/api-admin/events/search/all', (req, res) => {
        Event.find({}, (err, events) => {
                if (err) {
                    console.log(err);
                } else {
                    let allEvents = { allEvents: events };
                    res.render('api-admin', allEvents);
                }
            });
    });

    // READ - retrieve events based on filters
    router.get('/api-admin/events/search', (req, res) => {
        let query = {};
        if (req.query.month !== '') {
            query['month'] = req.query.month;
        };
        if (req.query.day !== '') {
            query['day'] = req.query.day;
        };
        if (req.query.date !== '') {
            query['date'] = req.query.date;
        };
        if (req.query.time !== '') {
            query['time'] = req.query.time;
        };

        Event.find(query, (err, events) => {
            if (err) {
                console.log(err);
            } else {
                if (events[0] === undefined) {
                    res.render('api-admin', { noResMessage: 'Looks like there isn\'t anything in the database matching your query; try again.' });
                } else {
                    var filteredEvents = { filteredEvents: events };
                    res.render('api-admin', filteredEvents);
                }
            }
        })
    });

    router.post('/api-admin/events/create', (req, res) => {
        return new Promise((resolve, reject) => {
            if (typeof req.body.day !== 'string' || req.body.day === '' || req.body.day === undefined) {
                return reject(new Error('Day for event must be provided'));
            };

            if (typeof req.body.month !== 'string' || req.body.month === '' || req.body.month === undefined) {
                return reject(new Error('Month for event must be provided'));
            };

            if (typeof req.body.date !== 'string' || req.body.date === '' || req.body.date === undefined) {
                return reject(new Error('Date for event must be provided'));
            };

            if (typeof req.body.time !== 'string' || req.body.time === '' || req.body.time === undefined) {
                return reject(new Error('Time for event must be provided'));
            };

            if ( typeof req.body.description !== 'string' || req.body.description === '' || req.body.description === undefined || req.body.description.length > 150) {
                return reject(new Error('Description for event must be provided and must not be more than 150 characters'));
            };

            // once the request passes all the tests above, a new Album is created
            let newEvent = Event({
                day: req.body.day,
                month: req.body.month,
                date: req.body.date,
                time: req.body.time,
                description: req.body.description
            });

            // if no 'reject' was returned above from validation check, a 'resolve' is returned here
            return resolve(
                // first we check to see if the same event already exists in the database
                Event.find({ description: req.body.description })
                .then((event) => {
                    // if the event DOES NOT already exist in the database...
                    if (event.description === undefined) {
                        newEvent.save((err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                let createdEvent = { createdEvent: newEvent };
                                res.render('api-admin', createdEvent);
                            }
                        });
                    } else {
                        let hbsObj = {
                                message: 'Event already exists in the database',
                                error: {
                                    status: 409,
                                    /* Conflict response - request would conflict with state of server */
                                    stack: JSON.stringify(album, null, 2)
                                }
                            }
                            // ...send error status and message
                        return res.status(409).render('error', hbsObj);
                    }
                }));
        });
    });

    router.put('/api-admin/events/update/:id', (req, res) => {
        let query = {};
        if (req.body.day !== undefined) {
            query['day'] = req.body.day;
        };
        if (req.body.month !== undefined) {
            query['month'] = req.body.month;
        };
        if (req.body.date !== undefined) {
            query['date'] = req.body.date;
        };
        if (req.body.time !== undefined) {
            query['time'] = req.body.time;
        };
        if (req.body.description !== undefined) {
            query['description'] = req.body.description;
        };

        Event.findOneAndUpdate({ _id: req.params.id }, query, { upsert: true }, (err, doc) => {
            if (err) {
                console.log(err);
            } else {
                Event.findOne({ _id: doc.id }, (err, doc) => {
                    let updatedEvent = { updatedEvent: doc };
                    res.render('api-admin', updatedEvent);
                })
            }
        })
    });

    router.delete('/api-admin/events/delete/:id', (req, res) => {
        Event.findOneAndRemove({ _id: req.params.id }, (err, doc) => {
            if (err) {
                console.log(err);
            } else {
                let deletedEvent = { deletedEvent: doc }
                res.render('api-admin', deletedEvent);
            }
        })
    });
};
