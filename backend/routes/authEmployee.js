const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../schema/employee");
const session = require("express-session");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const jwt = require("jsonwebtoken");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.ATLAS_URI }),
  })
);

router.use(
  cors({
    origin: "http://localhost:8080",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

router.post("/verifyJWT", (req, res) => {
  if (req.cookies.token) {
    let result = jwt.verify(req.cookies.token, process.env.SESSION_SECRET);
    if (result == "admin") {
      res.json({ auth: true, admin: true });
    } else if (result) {
      res.json({ auth: true, admin: false });
    } else res.json({ auth: false, admin: false });
  } else {
    console.log("Didn't get the token");
    console.log(req.cookies);
    console.log(req.cookies.token);
  }
});

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
    else if (result) {
      let token = jwt.sign(req.body.username, process.env.SESSION_SECRET);

      res.cookie("token", token, { sameSite: "none", secure: "false" });

      res.json({ auth: true, admin: false });
    } else {
      res.json({ auth: false, admin: false });
    }
  });
});

router.post("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) res.json(err);
    else res.redirect("/login");
  });
});

module.exports = router;
