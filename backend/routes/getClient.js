"use strict";

const express = require("express");
const router = express.Router();
const Client = require("../schema/client");

const baseURL = 'http://localhost:3000'
function matchInitials(client) {
  return client.body.initials === 'JAR';
}

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

router.post("/getClientPost", async (req, res) => {
  await Client.find({
    initials: req.body.initials
  });
  res.status(201).send();
});

router.get("/getAllClients", (req, res) => {
  Client.find({})
    .then((data) => {
      console.log(data);
      res.json(data);
      //console.log(res);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
