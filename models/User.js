const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			minLength: 3,
			maxLength: 20,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		},
		password: {
			type: String,
			required: true,
			minLength: 8,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
