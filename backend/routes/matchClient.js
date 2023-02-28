const express = require("express");
const router = express.Router();
const Client = require("../schema/client");
const Job = require("../schema/job");

router.post("/getMatch", async (req, res) => {
  let matchingJobs = [];
  try {
    const client = await Client.find({
      firstName: req.body.firstName,
      middleInitial: req.body.middleInitial,
      lastInitial: req.body.lastInitial,
    });
    console.log(client);
    if (client.length == 0) return;

    for (let i in client[0].industry) {
      const jobs = await Job.find({
        industry: client[0].industry[i],
        timeCommitment: client[0].hours,
      });
      matchingJobs = matchingJobs.concat(jobs);
    }
    console.log(matchingJobs);
    res.json(matchingJobs);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
