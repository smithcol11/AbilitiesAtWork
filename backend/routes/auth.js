"use strict";

const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const crypto = require("crypto");

passport.use(
  new LocalStrategy(function verify(username, password, resultCallback) {
    crypto.pbkdf2(
      password,
      "nosalt",
      310000,
      32,
      "sha256",
      (err, hashedPassword) => {
        // Yes, the hash of the admin password is directly hardcoded here. At least the actual
        // password isn't stored anywhere (and this code shouldn't leave the server).
        const expectedHash = new Uint8Array([
          163, 205, 218, 83, 109, 196, 65, 68, 164, 68, 126, 246, 76, 236, 194,
          153, 25, 40, 127, 179, 195, 55, 248, 148, 79, 117, 107, 82, 72, 82,
          24, 196,
        ]);

        if (err) {
          return resultCallback(err);
        } else if (!crypto.timingSafeEqual(expectedHash, hashedPassword)) {
          return resultCallback(null, false, {
            message: "Incorrect credentials.",
          });
        } else {
          return resultCallback(null, username);
        }
      }
    );
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

router.post(
  "/authAdmin",
  passport.authenticate("local", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  })
);

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/authUser", (req, res) => {
  res.send("Login page. Failed logins redirect here, for now.");
});

router.get("/login-success", (req, res) => {
  res.send("Successful logins redirect here, for now.");
});

module.exports = router;
