"use strict";

const express = require("express");
const router = express.Router();
const Job = require("../schema/job");

// Add Job
router.post("/createJob", async (req, res) => {
  // console.log(req.body);
  await Job.insertOne({
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