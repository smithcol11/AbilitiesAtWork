"use strict";

const express = require("express");
const router = express.Router();
const Job = require("../schema/job");
// const session = require("express-session");
// const cors = require("cors");
// const MongoStore = require("connect-mongo");
// // const jwt = require(jsonwebtoken);


// router.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({ mongoUrl: process.env.ATLAS_URI }),
//   })
// );

// router.use(
//   cors({
//     origin: "http://localhost:8080",
//     methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
//     credentials: true,
//   })
// );

// Add Job
router.post("/createJob", async (req, res) => {
  // console.log(req.body);
  await Job.insertMany({
    contactName: req.body.contactName,
    businessName: req.body.businessName,
    industry: req.body.industry,
    position: req.body.position,
    shift: req.body.shift,
    hours: req.body.hours,
    city: req.body.city,
    zip: req.body.zip,
    date: req.body.date,
    address: req.body.address,
    county: req.body.county,
    notes: req.body.notes,
    contactEmail: req.body.contactEmail,
    contactPhoneNumber: req.body.contactPhoneNumber,
  });
  res.status(201).send();
});

module.exports = router;