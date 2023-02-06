const express = require("express");
const router = express.Router();
const JobOptions = require("../schema/jobOptions");
module.exports = router;

router.get("/GetJobOptions", (req, res) => {
  JobOptions.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});
