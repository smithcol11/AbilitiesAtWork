const express = require("express");
const router = express.Router();
const JobOptions = require("../schema/jobOptions");

router.get("/GetJobOptions", (req, res) => {
  JobOptions.find({})
    .then((data) => {
      if (!(data instanceof Array)) {
        throw Error("JobOptions query must return a list of documents.");
      }
      if (data.length < 1) {
        throw Error(`Expected 1 JobOptions document; received ${data.length}.`);
      }
      res.json(data[0]);
    })
    .catch((err) => console.log(err));
});

router.post("/jobOptions", async (req, res) => {
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
});

module.exports = router;
