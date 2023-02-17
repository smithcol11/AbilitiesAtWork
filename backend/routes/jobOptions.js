const express = require("express");
const router = express.Router();
const JobOptions = require("../schema/jobOptions");

router.get("/GetJobOptions", async (req, res) => {
  try{
    const option = await JobOptions.find({})
    if (!option){
      return res.status(400).send('No job option found when searching')
    }
    res.json(option)
  } catch(error){
    res.status(500).send('Error getting job options')
  }
});

router.post("/updateJobOptions", async (req, res) => {
  try{
    await JobOptions.replaceOne(
      { _id: req.body._id },
      {
        counties: req.body.counties,
        cities: req.body.cities,
        zips: req.body.zips,
        positions: req.body.positions,
        industries: req.body.industries,
        shiftOptions: req.body.shiftOptions,
        timeCommitmentOptions: req.body.timeCommitmentOptions,
      }
    );
    res.status(201).send();
  } catch(error){
    res.status(500).send('Error updating job option')
  }
});

module.exports = router;
