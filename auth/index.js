import './init.js';

import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', async (req, res, next) => {
	passport.authenticate('login', (err, user, _) => {
		if (err || !user) return res.status(401).send('Unauthorized');

		req.login(user, { session: false }, async (error) => {
			if (error) return next(error);

			const jwtBody = { id: user.id, email: user.email };
			const token = jwt.sign({ user: jwtBody }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });

			return res.json({ token });
		});
	})(req, res, next);
});

export default router;
