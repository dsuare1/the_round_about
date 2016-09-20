'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		trim: false,
		required: true
	},
	password: {
		type: String,
		trim: false,
		required: true
	}
})

const User = mongoose.model('User', UserSchema);

module.exports = User;