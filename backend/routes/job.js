const express = require("express");
const router = express.Router();
const Job = require("../schema/job");

// Add Job
router.post("/createJob", async (req, res) => {
  try{
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
  } catch(error){
    res.status(500).send('Error creating job')
  }
});

router.get("/GetAllJobs", async (req, res) => {
  try{
    await Job.find({});
    if (!Job){
      return res.status(400).send('No job found when searching')
    }
    res.send(Job)
  } catch(error){
    res.status(500).send('Error finding jobs')
  }
    /*.then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => console.log(err));*/
});

module.exports = router;
