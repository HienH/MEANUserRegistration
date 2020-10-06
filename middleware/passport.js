const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.model');
require('dotenv').config();

module.exports = function (passport) {
    console.log('hellooo');
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = process.env.SECRET;
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.getUserById({ _id: jwt_payload.user._id }, (err, user) => {
            if (err) {
                return done(err, false)
            }
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        });
    }));
};