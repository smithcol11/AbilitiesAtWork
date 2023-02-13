const express = require("express");
const router = express.Router();
const JobOptions = require("../schema/jobOptions");
module.exports = router;

router.get("/GetJobOptions", (req, res) => {
  JobOptions.find({})
    .then((data) => {
      if(!(data instanceof Array)) {
        throw Error("JobOptions query must return a list of documents.");
      }
      if (data.length < 1) {
        throw Error(`Expected 1 JobOptions document; received ${data.length}.`);
      }
      res.json(data[0]);
    })
    .catch((err) => console.log(err));
});
