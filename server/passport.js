const passport    = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy   = passportJWT.Strategy;

const { findByEmail } = require('./services/auth');

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
  },
  async (jwtPayload, cb) => {

    const user = await findByEmail(jwtPayload.email);

    if (!user) return cb(null, false, { message: 'User not found' });
    return cb(null, jwtPayload);
  }
));
