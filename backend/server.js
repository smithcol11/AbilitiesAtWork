require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;
const connection = mongoose.connection;

/*
mongoose
  .connect(uri, {
    useNewUrlParser: true,
  })
  .then((result) => {
    console.log(`Connected to ${result.connection.name} db`);
  })
  .catch((error) => console.log(error));
  */

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require("./routes/auth.js"));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use(session({
  secret: 'keyboard cat',
  resave: false, // don't save session if unmodified
  saveUninitialized: false //, // don't create session until something stored
  //store: 
}));

app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = app.listen(port, () => {
  console.log(`AAW app listening on port ${port}`);
});
