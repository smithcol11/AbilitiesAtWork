"use strict";

const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const Admin = require("../schema/admin");

passport.use(new LocalStrategy(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

router.post("/registerAdmin", (req, res) => {
  Admin.register(
    new Admin({ username: "admin", active: false }),
    "admin",
    (err, result) => {
      if (err) res.redirect(err);
      if (result) res.redirect("/login");
      else res.json("failure");
    }
  );
});

router.post("/loginAdmin", (req, res) => {
  const adminAuth = Admin.authenticate();
  adminAuth(req.body.username, req.body.password, (err, result) => {
    if (err) res.json(err);
    if (result) res.redirect("/");
    else res.redirect("/login");
  });
});

router.post("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) res.json(err);
    else res.redirect("/login");
  });
});

module.exports = router;
