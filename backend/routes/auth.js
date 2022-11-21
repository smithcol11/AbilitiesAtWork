'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');

passport.use(new LocalStrategy(
  { // or whatever you want to use
    usernameField: 'username',    // define the parameter in req.body that passport can use as username and password
    passwordField: 'password'
  }, 
function verify(username, password, resultCallback) {

  var salt = "salt!";

  crypto.pbkdf2(password, salt, 310000, 32, 'sha256', (err, hashedPassword) => {
    var expectedHash = new Uint8Array(32);

    if (err) { 
      return resultCallback(err); 
    } else if (!crypto.timingSafeEqual(expectedHash, hashedPassword)) {
      return resultCallback(null, false, { message: 'Incorrect credentials.' });
    } else {
      return resultCallback(null, false, { message: 'Login complete.' });
    }
  });
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

// router.post('/login/admin', (req, res) => {
//   console.log("authenticate???");
//   let postHandler = passport.authenticate('local', {
//       successReturnToOrRedirect: '/',
//       failureRedirect: '/login',
//       failureMessage: true
//     });
//   postHandler(req, res);
//   }
// );

router.post('/login/admin', passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true
}));

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;