"use strict";

const express = require("express");
const router = express.Router();
const Client = require("../schema/client");

router.post("/addClient", async (req, res) => {
  await Client.insertMany({
    initials: req.body.initials,
    hours: req.body.hours,
    industry: req.body.industry,
  });
  res.status(201).send();
});

module.exports = router;
