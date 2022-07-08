import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

export default new JwtStrategy(
	{
		secretOrKey: process.env.JWT_SECRET_KEY,
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
	},
	(token, done) => {
		return done(null, token.user);
	}
);
