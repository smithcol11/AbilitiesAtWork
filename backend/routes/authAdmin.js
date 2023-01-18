const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const Admin = require("../schema/admin");
const jwt = require("jsonwebtoken");

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
    else if (result) {
      let token = jwt.sign(req.body.username, process.env.SESSION_SECRET);

      res.cookie("token", token);

      res.json({ auth: true, admin: true });
    } else {
      res.json({ auth: false, admin: false });
    }
  });
});

module.exports = router;
