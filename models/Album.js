'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
	artist: {
		type: String,
		trim: true,
		// lowercase: true,
		required: [true, 'Album artist must be included.']
	},
	title: {
		type: String,
		trim: true,
		// lowercase: true,
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
		// lowercase: true,
		required: [true, 'Album genre must be included.']
	},
	price: {
		type: Number,
		required: [true, 'Album price must be included.']
	},
	format: {
		type: Number,
		trim: true,
		required: [true, 'Album format (7 or 12) must be included.']
	},
	albumCover: {
		data: Buffer,
		type: String,
		required: [true, 'An album cover must be included.']
	},
	quantity: {
		type: Number,
		required: [true, 'A true or false value must be included for the \'inStock\' property.']
	},
	isStaffPick: {
		type: Boolean,
		required: [true, 'A true or false value must be included for the \'isStaffPick\' property.']
	}
});

const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;