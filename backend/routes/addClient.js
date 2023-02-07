"use strict";

const express = require("express");
const router = express.Router();
const Client = require("../schema/client");

router.post("/addClient", async (req, res) => {
  await Client.insertOne({
    hours: req.body.clientHours,
    intials: req.body.clientInitials,
    industry: req.body.clientIndustry,
  });
  res.status(201).send();
});

module.exports = router;
