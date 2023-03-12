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

router.post("/verifyJWT", async (req, res) => {
  try{
    if (req.cookies.token) {
      const result = await jwt.verify(req.cookies.token, process.env.SESSION_SECRET);
      if (result == "admin") {
        res.json({ auth: true, admin: true });
      } else if (result) {
        res.json({ auth: true, admin: false });
      } else res.json({ auth: false, admin: false });
    } 
  } catch(error){
      res.status(400).send({error: 'Token cookie not received'});
  }
});

router.post("/registerUser", async (req, res) => {
  try{
    await User.register(
      new User({ username: req.body.username, active: false }),
      req.body.password,
      (err, result) => {
        if (err) res.redirect(err);
        if (result) res.redirect("/login");
        else res.json("failure");
      }
    );
  } catch(error){
    res.status(400).send({error: 'Error registering user'})
  }
});

router.post("/loginUser", async (req, res) => {
  try{
    await User.authenticate()(req.body.username, req.body.password, (err, result) => {
      if (err) res.json(err);
      else if (result) {
        let token = jwt.sign(req.body.username, process.env.SESSION_SECRET);

        res.cookie("token", token, { sameSite: "none", secure: "false" });

        res.json({ auth: true, admin: false });
      } else {
        res.json({ auth: false, admin: false });
      }
    });
  } catch(error){
    res.status(400).send({error: 'Error login user'})
  }
});

router.post("/logout", async (req, res) => {
  try{
    req.logout(function (err) {
      if (err) res.json(err);
      else res.redirect("/login");
    });
  } catch(error){
    res.status(400).send({error: 'Error logout user'})
  }
});

module.exports = router;
