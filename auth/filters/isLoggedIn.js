import passport from 'passport';

export default function isLoggedIn(req, res, next) {
	passport.authenticate('jwt', { session: false }, (err, user) => {
		if (err) return res.status(500).send('Unknown error');

		if (user == null || !user) return res.status(401).send('Unauthorized');

		req.user = user;
		next();
	})(req, res, next);
}
