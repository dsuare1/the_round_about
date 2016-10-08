'use strict';

const Album = require('../models/Album.js');

module.exports = (router) => {
    console.log('Controller loaded --> Search controller (tra-search-controller.js)');

    router.get('/browse', (req, res) => {
        res.status(200).render('browse');
    });

    router.get('/browse/all', (req, res) => {
        Album.find({})
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

    router.get('/browse/in-stock', (req, res) => {
        Album.find({ quantity: { $gt: 0 } })
            .sort({ artist: 1 })
            .exec((err, inStockAlbums) => {
                if (err) {
                    console.log(err);
                } else {
                    var inStockAlbums = { inStockAlbums };
                    res.render('browse', inStockAlbums);
                }
        })
    })

    router.get('/browse/search', (req, res) => {
        let query = {};
        if (req.query.format !== undefined) {
            query['format'] = req.query.format;
        };
        if (req.query.genre !== undefined) {
            query['genre'] = req.query.genre;
        };

        Album.find(query)
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

    router.get('/browse/:id', (req, res) => {
        Album.find({ _id: req.params.id }, (err, album) => {
            if (err) {
                console.log(err);
            } else {
                var album = { album: album[0] };
                res.render('single-album', album);
            };
        });
    });
}
