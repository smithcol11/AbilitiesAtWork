const express = require("express");
const router = express.Router();
const Jobs = require("../schema/job");
module.exports = router;

router.get("/GetAllJobs", (req, res) => {
  Jobs.find({})
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => console.log(err));
});

router.get("/getJobs", (req, res) => {
  Jobs.find({})
    .then((data) => {
      let match = data.find(({industry}) => industry === req._parsedOriginalUrl.query);
      if (match == null) {
        console.log('No matches found');
        res.json('[]')
      }
      else {
        res.json(match);
      }

    })
    .catch((err) => console.log(err));
});