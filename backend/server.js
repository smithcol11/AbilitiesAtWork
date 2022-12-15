require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require('passport');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;
const connection = mongoose.connection;
const MongoStore = require("connect-mongo");

mongoose
  .connect(uri, {
    useNewUrlParser: true,
  })
  .then((result) => {
    console.log(`Connected to ${result.connection.name} db`);
  })
  .catch((error) => console.log(error));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use(cookieParser('SECRET'));
app.use(
  session({
    secret: "SECRET",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    //cookie: { secure: true },
    store: MongoStore.create({ mongoUrl: process.env.ATLAS_URI })
  })
);

app.use(passport.initialize());
app.use(passport.authenticate('session'));

app.use(require("./routes/auth_admin.js"));
app.use(require("./routes/auth_employee.js"));

const server = app.listen(port, () => {
  console.log(`AAW app listening on port ${port}`);
});

module.exports = app;