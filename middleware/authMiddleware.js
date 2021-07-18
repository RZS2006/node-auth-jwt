const jwt = require('jsonwebtoken');
const User = require('../models/User');

const checkUser = (req, res, next) => {
	const accessToken = req.cookies['access_token'];

	if (!accessToken) {
		res.locals.user = null;
		res.locals.authenticated = false;

		return next();
	}

	jwt.verify(
		accessToken,
		process.env.ACCESS_TOKEN_SECRET,
		async (err, decoded) => {
			if (err) {
				console.log(err);
				res.locals.user = null;
				res.locals.authenticated = false;

				return next();
			}

			const user = await User.findById(decoded.id);

			res.locals.user = user;
			res.locals.authenticated = true;

			next();
		}
	);
};

const requireAuth = (req, res, next) => {
	const accessToken = req.cookies['access_token'];

	if (!accessToken) {
		return res.redirect(401, '/auth/login');
	}

	jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err) => {
		if (err) {
			return res.redirect(403, '/auth/login');
		}

		next();
	});
};

const preventAuth = (req, res, next) => {
	const accessToken = req.cookies['access_token'];

	if (!accessToken) {
		return next();
	}

	jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err) => {
		if (err) {
			return next();
		}

		res.redirect('/posts');
	});
};

module.exports = {
	checkUser,
	requireAuth,
	preventAuth,
};
