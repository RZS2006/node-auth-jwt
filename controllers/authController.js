const User = require('../models/User');

const signup_get = (req, res) => {
	res.send('Sign Up Get');
};

const login_get = (req, res) => {
	res.send('Log In Get');
};

const signup_post = (req, res) => {
	res.send('Sign Up Post');
};

const login_post = (req, res) => {
	res.send('Log In Post');
};

const logout_delete = (req, res) => {
	res.send('Log Out Delete');
};

module.exports = {
	signup_get,
	login_get,
	signup_post,
	login_post,
	logout_delete,
};
