const express = require("express");
const job = require("../schema/job");
const router = express.Router();
const Job = require("../schema/job");
module.exports = router;

// Add  a job
router.post("/addJob", async (req, res) => {
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
router.get("/allJobs", async (req, res) => {
  try {
    await Job.find({}).then((data) => {
      res.json(data);
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Get a job
router.get("/job", async (req, res) => {
  try {
    await Job.findById(req.body._id).then((data) => {
      res.json(data);
    });
  } catch (err) {
    res.status(500).json({ message: error });
  }
});

// update a job
router.patch("/editJob", async (req, res) => {
  console.log(req.body);
  let job;
  try {
    job = await Job.findById(req.body._id);
    if (job == null) {
      return res.status(404).json({ message: "Cannot find job" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.job = job;

  if (req.body.contact) {
    if (req.body.contact.email) res.job.contact.email = req.body.contact.email;
    if (req.body.contact.name) res.job.contact.name = req.body.contact.name;
    if (req.body.contact.phone) res.job.contact.phone = req.body.contact.phone;
  }
  if (req.body.employer) res.job.employer = req.body.employer;
  if (req.body.industry) res.job.industry = req.body.industry;
  if (req.body.shift) res.job.shift = req.body.shift;
  if (req.body.timeCommitment) res.job.timeCommitment = req.body.timeCommitment;
  if (req.body.city) res.job.city = req.body.city;
  if (req.body.zip) res.job.zip = req.body.zip;
  if (req.body.openingDate) res.job.openingDate = req.body.openingDate;
  if (req.body.address) res.job.address = req.body.address;
  if (req.body.county) res.job.county = req.body.county;
  if (req.body.notes) res.job.notes = req.body.notes;
  if (req.body.hourlyWage) res.job.hourlyWage = req.body.hourlyWage;
  if (req.body.enteredBy) res.job.enteredBy = req.body.enteredBy;
  if (req.body.updatedBy) res.job.updatedBy = req.body.updatedBy;
  if (req.body.benefits) res.job.benefits = req.body.benefits;
  if (req.body.benefits) res.job.position = req.body.position;


  try {
    const updatedJob = await res.job.save();
    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete a job
router.delete("/deleteJob", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.body._id);
    res.json({ message: "Deleted Job" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
