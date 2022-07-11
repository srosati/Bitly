import passport from 'passport';

import jwtStrategy from './strategies/jwt.js';
import loginStrategy from './strategies/login.js';

passport.use('login', loginStrategy);
passport.use(jwtStrategy);
