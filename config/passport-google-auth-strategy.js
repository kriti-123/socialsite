const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const { doesNotMatch } = require('assert');
passport.use(new GoogleStrategy({
    clientID: "1029169291601-079oou1q7uvpd5ik08k0rfp0ev52pjk8.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){
        console.log('error find in user',err);
        return; 
      }
        console.log(profile);
         if(user){
            return done(null,user);
         }
         else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){console.log('error create in user',err);return; }
                return done(null,user);
            })
         }
        

    })
    
  }
));
module.exports=passport;

