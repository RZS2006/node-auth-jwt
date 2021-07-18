const jwt = require('jsonwebtoken');
const User = require('../models/User');

const checkUser = (req, res, next) => {
	try {
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
	} catch (err) {
		console.error(err);
	}
};

const requireAuth = () => {};

const preventAuth = () => {};

module.exports = {
	checkUser,
	requireAuth,
	preventAuth,
};
