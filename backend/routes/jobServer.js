"use strict";

const express = require("express");
const router = express.Router();
const Job = require("../schema/job");
module.exports = router;

// Add  a job
router.post("/jobs", async (req, res) => {
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
    hourlyWage: 0,
    enteredBy: "FIX ME",
    updatedBy: "FIX ME",
    benefits: "FIX ME",
  });

  res.status(201).send();
});

// Gell all jobs
router.get("/jobs", (req, res) => {
  Job.find({})
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => console.log(err));
});

// Get a job
router.get("/jobs/:id", getJob, (req, res) => {
  res.json(res.job)
})

// update a job
router.patch("/jobs/:id", getJob, async (req, res) => {
  if (req.body.employer != null) {
    res.job.employer = req.body.employer
  }

  try {
    const updatedJob = await res.job.save()
    res.json(updatedJob)
  } catch (error) {
    res.status(400).json({ message: error.message})
  }
})

// delete a job
router.delete("/jobs/:id", getJob, async (req, res) => {
  try {
    await res.job.remove()
    res.json({ message: 'Deleted Job'})
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
})

// function to return a job by id
async function getJob(req, res, next) {
  let job
  try {
    job = await Job.findById(req.params.id)
    if (job == null) {
      return res.status(404).json({ message: "Cannot find job"})
    }
  } catch(error) {
    return res.status(500).json({ message: error.message})
  }
  res.job = job
  next()
}
