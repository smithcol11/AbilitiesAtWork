const express = require("express");
const router = express.Router();
const Jobs = require("../schema/job");
module.exports = router;

router.get("/GetAllJobs", (req, res) => {
  console.log("in get all jobs");
  Jobs.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});

router.get("/getJobs", (req, res) => {
  Jobs.find({})
    .then((data) => {
      let match = data.find(
        ({ industry }) => industry === req._parsedOriginalUrl.query
      );
      if (match == null) {
        console.log("No matches found");
        res.json("[]");
      } else {
        res.json(match);
      }
    })
    .catch((err) => console.log(err));
});

router.post("/getJobs", async (req, res) => {
  let matchedJobs = await Jobs.find({})
    .then((data) => {
      let match = data.filter(
        ({ industry, timeCommitment }) =>
          (timeCommitment === req.body.timeCommitment ||
            req.body.timeCommitment === "Any") &&
          industry === req.body.industry[0]
      );
      return match;
    })
    .catch((err) => console.log(err));

  if (matchedJobs == null) {
    console.log("No matches found");
    res.json("[]");
  } else {
    res.json(matchedJobs);
  }
});
