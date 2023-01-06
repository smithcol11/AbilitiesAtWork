"use strict";

const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../schema/employee");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.post("/registerUser", (req, res) => {
  User.register(
    new User({ username: req.body.username, active: false }),
    req.body.password,
    (err, result) => {
      if (err) res.redirect(err);
      if (result) res.redirect("/login");
      else res.json("failure");
    }
  );
});

router.post("/loginUser", (req, res) => {
  const userAuth = User.authenticate();
  userAuth(req.body.username, req.body.password, (err, result) => {
    if (err) res.json(err);
    if (result) res.json({ auth: true });
    else res.json({ auth: false });
  });
});

router.post("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) res.json(err);
    else res.redirect("/login");
  });
});

module.exports = router;
