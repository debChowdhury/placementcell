const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

//creating passport local strategy
passport.use(new LocalStrategy({
      usernameField: 'email'
  },
  function(email, password, done){
      // find a user and establish the identity
      User.findOne({email: email}, function(err, user)  {
          if (err){
              console.log('Error in finding user --> Passport');
              return done(err);
          }

          if (!user || user.password != password){
              console.log('Invalid email/password');
              return done(null, false);
          }

          return done(null, user);
      });
  }));

//serializing user by passport
passport.serializeUser(function(user, done){
    done(null, user.id);
});
//deserializing user by passport
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        return done(null, user);
    });
})
//checking authentication middleware by passport
passport.checkAuthentication = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  return res.redirect('/');
}
//checking authentication status for signin and signup pages
passport.checkAuthenticationForSignInAndSignUp = function(req, res, next){
  if(req.isAuthenticated()){
    return res.redirect('/home');
  }
  next();
}
//setting authenticated user data in locals
passport.setAuthenticatedUser = function(req, res, next){
  if(req.isAuthenticated()){
    res.locals.user = req.user;
  }
  next();
}

module.exports = passport;