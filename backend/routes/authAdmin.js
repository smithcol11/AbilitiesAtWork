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
  try{
    Admin.register(
      new Admin({ username: "admin", active: false }),
      "admin",
      (err, result) => {
        if (err) res.redirect(err);
        if (result) res.redirect("/login");
        else res.json("failure");
      }
    );
  } catch(error){
    res.status(400).send({error: 'Error registering admin'})
  }
});

router.post("/loginAdmin", (req, res) => {
  try{
    const adminAuth = Admin.authenticate();
    adminAuth(req.body.username, req.body.password, (err, result) => {
      if (err) res.json(err);
      else if (result) {
        let token = jwt.sign(req.body.username, process.env.SESSION_SECRET);

        res.cookie("token", token, { sameSite: "none", secure: "false" });

        res.json({ auth: true, admin: true });
      } else {
        res.json({ auth: false, admin: false });
      }
    });
  } catch(error){
    res.status(400).send({error: 'Error login admin'})
  }
});

module.exports = router;
