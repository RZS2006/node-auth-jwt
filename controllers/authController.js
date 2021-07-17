const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createAccessToken = (id) => {
	return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
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
		const emailExists = await User.findOne({ email });

		if (emailExists) {
			return res.status(400).json({ error: 'Email already exists' });
		}

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
};

const login_post = async (req, res) => {
	const { email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });

		if (!existingUser) {
			return res.status(400).json({ error: 'User does not exist' });
		}

		const passwordValid = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (!passwordValid) {
			return res
				.status(400)
				.json({ error: 'Email and password do not match' });
		}

		const accessToken = createAccessToken(existingUser.id);

		res.cookie('access_token', accessToken, {
			httpOnly: true,
			maxAge: process.env.ACCESS_TOKEN_EXPIRATION * 1000,
		});
		res.status(200).json({ user: existingUser.id });
	} catch (err) {
		console.error(err);
		res.status(500);
	}
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
