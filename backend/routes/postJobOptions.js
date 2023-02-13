const express = require("express");
const router = express.Router();
const JobOptions = require("../schema/jobOptions");

router.post("/jobOptions", async (req, res) => {
  await JobOptions.replaceOne( {_id : req.body._id}, {
    counties: req.body.counties,
    cities: req.body.cities,
    zips: req.body.zips,
    positions: req.body.positions,
    industries: req.body.industries,
    shiftOptions: req.body.shiftOptions,
    timeCommitmentOptions: req.body.timeCommitmentOptions,
  });
  res.status(201).send();
});

module.exports = router;
