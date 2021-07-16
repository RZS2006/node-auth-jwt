const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createAccessToken = (id) => {
	jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
	});
};

const signup_get = (req, res) => {
	res.render('signup', { title: 'Sign Up' });
};

const login_get = (req, res) => {
	res.render('login', { title: 'Log In' });
};

const signup_post = async (req, res) => {
	const { username, email, password } = req.body;

	try {
		const salt = await bcrypt.genSalt();

		const user = new User({
			username,
			email,
			password: await bcrypt.hash(password, salt),
		});

		const newUser = await user.save();

		const accessToken = createAccessToken(newUser.id);

		res.cookie('access_token', accessToken, {
			httpOnly: true,
			maxAge: process.env.ACCESS_TOKEN_EXPIRATION * 1000,
		});
		res.status(201).json({ user: newUser.id });
	} catch (err) {
		console.error(err);
		res.status(500);
	}

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
