'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
	artist: {
		type: String,
		trim: true,
		required: [true, 'Album artist must be included.']
	},
	title: {
		type: String,
		trim: true,
		required: [true, 'Album title must be included.']
	},
	year: {
		type: String,
		trim: true,
		required: [true, 'Album year must be included.']
	},
	genre: {
		type: String,
		trim: true,
		required: [true, 'Album genre must be included.']
	},
	condition: {
		type: String,
		trim: true,
		required: [true, 'Album condition must be included.']
	},
	format: {
		type: String,
		trim: true,
		required: [true, 'Album format (33 or 45) must be included.']
	},
	imgURL: {
		type: String,
		trim: true,
		required: [true, 'An imgURL for the album must be included.']
	},
	inStock: {
		type: Boolean,
		required: [true, 'A true or false value must be included for the \'inStock\' property.']
	},
	isStaffPick: {
		type: Boolean,
		required: [true, 'A true or false value must be included for the \'isStaffPick\' property.']
	}
});

const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;