"use strict";

const express = require("express");
const router = express.Router();
const Client = require("../schema/client");
const Job = require("../schema/job");

const baseURL = "http://localhost:3000";
function matchInitials(client) {
  return client.body.initials === "JAR";
}

/*
router.get("/matchClient", async (req, res) => {
  //console.log(req._parsedOriginalUrl.query);
  let matchedClient = await fetch(baseURL + '/getClient?' + req._parsedOriginalUrl.query, {method: 'GET'});
  matchedClient = await matchedClient.json();
  console.log("Display return from get")
  console.log(matchedClient);
  
  let matchedJobs = await fetch(baseURL + '/getJobs?' + matchedClient.industry, {method: 'GET'});
  matchedJobs = await matchedJobs.json();
  console.log("Display return from jobs")
  console.log(matchedJobs);
})
*/

router.post("/matchClient", async (req, res) => {
  let matchedClient = await fetch(baseURL + "/getClient", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      firstName: req.body.firstName,
      middleInitial: req.body.middleInitial,
      lastInitial: req.body.lastInitial,
    }),
  });

  if (!matchedClient) {
    try {
      matchedClient = await matchedClient.json();
      console.log("Found client: ", matchedClient);
    } catch (error) {
      console.log("Could not find client with those credentials ", error);
      res.json("[]");
    }

    let matchedJobs = await fetch(baseURL + "/getJobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        industry: matchedClient.industry,
        timeCommitment: matchedClient.hours,
      }),
    });

    try {
      matchedJobs = await matchedJobs.json();
      console.log("Matched jobs: ", matchedJobs);
      res.json(matchedJobs);
    } catch (error) {
      console.log(error);
      res.json("[]");
    }
  } else {
    console.log("Could not find client with those credentials ");
  }
});
/*
router.get("/getClient", (req, res) => {
  Client.find({})
    .then((data) => {
      //console.log(data);
      //res.json(data);
      let match = data.find(({initials}) => initials === req._parsedOriginalUrl.query);
      console.log(match);
      res.json(match);
    })
    .catch((err) => console.log(err));
});
*/

router.post("/getClient", async (req, res) => {
  let matchingJobs = [];
  await Client.find({
    firstName: req.body.firstName,
    middleInitial: req.body.middleInitial,
    lastInitial: req.body.lastInitial,
  }).then((client) => {
    if (client.length == 0) return;
    for (let i in client[0].industry) {
      Job.find({
        industry: client[0].industry[i],
        timeCommitment: client[0].hours,
      }).then((jobs) => {
        matchingJobs = matchingJobs.concat(jobs);
        console.log(matchingJobs);
      });
    }
    console.log(matchingJobs);
  });
});

module.exports = router;
