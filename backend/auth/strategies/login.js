import { compare } from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import { findUserByEmail } from '../../users/model.js';

const AUTHORIZATION_FIELDS = {
	usernameField: 'email',
	passwordField: 'password'
};

export default new LocalStrategy(AUTHORIZATION_FIELDS, async (email, password, done) => {
	try {
		const user = await findUserByEmail(email);
		if (user == null) return done(null, false, { message: 'User Not Found' });

		const isCorrectPassword = compare(password, user.password);
		if (!isCorrectPassword) return done(null, false, { message: 'Incorrect Password' });

		return done(null, user);
	} catch (error) {
		return done(error);
	}
});
