"use strict";

const { json } = require("express");
const express = require("express");
const router = express.Router();
const Job = require("../schema/job");

// Add Job
router.post("/createJob", async (req, res) => {
  await Job.insertMany({
    contact: {
      email: req.body.contactEmail,
      name: req.body.contactName,
      phone: req.body.contactPhoneNumber,
    },
    employer: req.body.businessName,
    industry: req.body.industry,
    position: req.body.position,
    shift: req.body.shift,
    timeCommitment: req.body.hours,
    city: req.body.city,
    zip: req.body.zip,
    openingDate: req.body.date,
    address: req.body.address,
    county: req.body.county,
    notes: req.body.notes,
    enteredBy: "FIX ME",
    updatedBy: "FIX ME",
    hourlyWage: 0,
    benefits: "FIX ME",
  });

  res.status(201).send();
});

module.exports = router;
