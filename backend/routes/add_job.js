"use strict";

const { json } = require("express");
const express = require("express");
const router = express.Router();
const Job = require("../schema/job");

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

  // the line below would create an exception for Unexpected end of JSON input
  // but still give the correct status 201. There is something wrong with res that seems
  // to trigger Unexpected end of JSON

  // if we are not sending anything back, the request still successfully add new
  // data to database but will result in Failed to fetch error for a timeout pending fetch

  res.status(201).send();

});

module.exports = router;