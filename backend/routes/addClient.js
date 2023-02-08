"use strict";

const express = require("express");
const router = express.Router();
const Client = require("../schema/client");

router.post("/addClient", async (req, res) => {
<<<<<<< HEAD
  await Client.insertOne({
    hours: req.body.clientHours,
    intials: req.body.clientInitials,
    industry: req.body.clientIndustry,
=======
  await Client.insertMany({
    initials: req.body.initials,
    hours: req.body.hours,
    industry: req.body.industry,
    enteredBy: "FIX ME",
    updatedBy: "FIX ME",
>>>>>>> main
  });
  res.status(201).send();
});

module.exports = router;
