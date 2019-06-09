const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrkey;

module.exports =(passport) => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{
    console.log(jwt_payload.id);
    User.findById({_id:jwt_payload.id}, (err, user) =>{
      console.log(user)
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
}
    
 
