require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;
const connection = mongoose.connection;

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
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:8080",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use(
  require("express-session")({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Route files
app.use(require("./routes/authAdmin.js"));
app.use(require("./routes/authEmployee.js"));
app.use(require("./routes/jobRoutes.js"));
app.use(require("./routes/jobOptions.js"));
app.use(require("./routes/clientRoutes.js"));
app.use(require("./routes/matchClient.js"));

const server = app.listen(port, () => {
  console.log(`AAW app listening on port ${port}`);
});

module.exports = app;
