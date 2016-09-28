'use strict';

const Album = require('../models/Album.js');

module.exports = (router) => {
    console.log('Controller loaded --> Search controller (tra-search-controller.js)');

    router.get('/browse', (req, res) => {
        res.status(200).render('browse');
    });

    router.get('/browse/all', (req, res) => {
        let aAlbums = {},
            bAlbums = {},
            cAlbums = {},
            dAlbums = {},
            eAlbums = {},
            fAlbums = {},
            gAlbums = {},
            hAlbums = {},
            iAlbums = {},
            jAlbums = {},
            kAlbums = {},
            lAlbums = {},
            mAlbums = {},
            nAlbums = {},
            oAlbums = {},
            pAlbums = {},
            qAlbums = {},
            rAlbums = {},
            sAlbums = {},
            tAlbums = {},
            uAlbums = {},
            vAlbums = {},
            wAlbums = {},
            xAlbums = {},
            yAlbums = {},
            zAlbums = {},
            otherAlbums = {};
            console.log(aAlbums);
        Album.find({})
            .sort({ artist: 1 })
            .exec((err, albums) => {
                if (err) {
                    console.log(err);
                } else {
                    for (var i = 0; i < albums.length; i++) {
                        switch(albums[i].artist.charAt(0)) {
                            case 'A':
                                // alphaAlbums['A'] += albums[i];
                                aAlbums += albums[i];
                                break;
                            case 'B':
                                // alphaAlbums['B'] += albums[i];
                                bAlbums += albums[i];
                                break;
                            case 'C':
                                // alphaAlbums['C'] += albums[i];
                                cAlbums += albums[i];
                                break;
                            case 'D':
                                // alphaAlbums['D'] += albums[i];
                                dAlbums += albums[i];
                                break;
                            case 'E':
                                // alphaAlbums['E'] += albums[i];
                                eAlbums += albums[i];
                                break;
                            case 'F':
                                // alphaAlbums['F'] += albums[i];
                                fAlbums += albums[i];
                                break;
                            case 'G':
                                // alphaAlbums['G'] += albums[i];
                                gAlbums += albums[i];
                                break;
                            case 'H':
                                // alphaAlbums['H'] += albums[i];
                                hAlbums += albums[i];
                                break;
                            case 'I':
                                // alphaAlbums['I'] += albums[i];
                                iAlbums += albums[i];
                                break;
                            case 'J':
                                // alphaAlbums['J'] += albums[i];
                                jAlbums += albums[i];
                                break;
                            case 'K':
                                // alphaAlbums['K'] += albums[i];
                                kAlbums += albums[i];
                                break;
                            case 'L':
                                // alphaAlbums['L'] += albums[i];
                                lAlbums += albums[i];
                                break;
                            case 'M':
                                // alphaAlbums['M'] += albums[i];
                                mAlbums += albums[i];
                                break;
                            case 'N':
                                // alphaAlbums['N'] += albums[i];
                                nAlbums += albums[i];
                                break;
                            case 'O':
                                // alphaAlbums['O'] += albums[i];
                                oAlbums += albums[i];
                                break;
                            case 'P':
                                // alphaAlbums['P'] += albums[i];
                                pAlbums += albums[i];
                                break;
                            case 'Q':
                                // alphaAlbums['Q'] += albums[i];
                                qAlbums += albums[i];
                                break;
                            case 'R':
                                // alphaAlbums['R'] += albums[i];
                                rAlbums += albums[i];
                                break;
                            case 'S':
                                // alphaAlbums['S'] += albums[i];
                                sAlbums += albums[i];
                                break;
                            case 'T':
                                // alphaAlbums['T'] += albums[i];
                                tAlbums += albums[i];
                                break;
                            case 'U':
                                // alphaAlbums['U'] += albums[i];
                                uAlbums += albums[i];
                                break;
                            case 'V':
                                // alphaAlbums['V'] += albums[i];
                                vAlbums += albums[i];
                                break;
                            case 'W':
                                // alphaAlbums['W'] += albums[i];
                                wAlbums += albums[i];
                                break;
                            case 'X':
                                // alphaAlbums['X'] += albums[i];
                                xAlbums += albums[i];
                                break;
                            case 'Y':
                                // alphaAlbums['Y'] += albums[i];
                                yAlbums += albums[i];
                                break;
                            case 'Z':
                                // alphaAlbums['Z'] += albums[i];
                                zAlbums += albums[i];
                                break;
                            default:
                                // alphaAlbums['A'] += albums[i];
                                otherAlbums += albums[i];
                        }
                    }
                    let aAlbums = { aAlbums: aAlbums };
                    res.render('browse', aAlbums);
                }
            });
    });

    router.get('/browse/search', (req, res) => {
        let query = {};
        if (req.query.format !== undefined) {
            query['format'] = req.query.format;
        };
        if (req.query.genre !== undefined) {
            query['genre'] = req.query.genre;
        };
        console.log(query);
        Album.find(query)
            .sort({ artist: 1 })
            .exec((err, albums) => {
                if (err) {
                    console.log(err);
                } else {
                    let albums = { albums: albums };
                    res.render('browse', albums);
                }
            });
    });

    router.get('/browse/:id', (req, res) => {
    	console.log('foo');
        console.log(req);
        console.log(req.params.id);
        Album.find({ _id: req.params.id }, (err, album) => {
            if (err) {
                console.log(err);
            } else {
                let album = { album: album[0] };
                console.log(album);
                res.render('single-album', album);
            };
        });
    });
}
