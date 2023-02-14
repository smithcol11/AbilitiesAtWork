"use strict";

const express = require("express");
const router = express.Router();
const Client = require("../schema/client");

router.post("/addClient", async (req, res) => {
  await Client.insertMany({
    firstName: req.body.firstName,
    middleInitial: req.body.middleInitial,
    lastInitial: req.body.lastInitial,
    hours: req.body.hours,
    industry: req.body.industry,
    enteredBy: "FIX ME",
    updatedBy: "FIX ME",
  });
  res.status(201).send();
});

module.exports = router;
