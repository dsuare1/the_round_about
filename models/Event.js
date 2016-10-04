'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
	day: {
		type: String,
		trim: true,
		required: [true, 'A day for the event must be included.']
	},
	month: {
		type: String,
		trim: true,
		required: [true, 'A month for the event must be included.']
	},
	date: {
		type: String,
		trim: true,
		required: [true, 'A date for the event must be included; please use format \'September 15th, 2016\' ']
	},
	time: {
		type: String,
		trim: true,
		required: [true, 'A time for the event must be included; please use format \'7:30pm\' ']
	},
	description: {
		type: String,
		trim: true,
		required: [true, 'A description for the event must be included.'],
		maxlength: 200
	}
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;