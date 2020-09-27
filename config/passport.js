const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/userModel');
const secret = require('./keys').JWT_SECRET;



module.exports = function(passport) {
  const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
  };
  console.log('are you here');
  passport.use('jwt',new JWTStrategy(options,(payload,done) => {
    console.log(options.jwtFromRequest);
    console.log(`payload:${payload}`)
    User.findOne({_id:payload._id})
               .then(user => {
                  if(user) {
                    done(null,user);
                  }
                  else {
                    done(null,false);
                  }
               })
               .catch(err => {
                    done(err,null);
               });
  })
  );
}
    
    