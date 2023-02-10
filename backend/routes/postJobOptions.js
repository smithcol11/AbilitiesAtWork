const express = require("express");
const router = express.Router();
const JobOptions = require("../schema/jobOptions");
module.exports = router;

router.post("/JobOptions", async (req, res) => {
    await JobOptions.insertMany({
        counties: req.body.counties,
        cities: req.body.cities,
        zips: req.body.zips,
        positions: req.body.positions,
        industries: req.body.industries,
        shiftOptions: req.body.shiftOptions,
        timeCommitmentOptions: req.body.timeCommitmentOptions,
    });
    console.log(res)
    res.status(201).send();
  });
  
  