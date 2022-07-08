import isLoggedIn from './isLoggedIn.js';

export default function userMatches(req, res, next) {
	isLoggedIn(req, res, () => {
		if (req.user_id !== req.user.id) return res.status(403).send('Forbidden');

		next();
	});
}
