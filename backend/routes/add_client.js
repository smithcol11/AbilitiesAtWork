"use strict";

const express = require("express");
const router = express.Router();
const Client = require("../schema/client");

router.post("/addClient", async (req, res) => {
  await Client.insertOne({
    intials: req.body.initials,
    preferece: {
      hours: req.body.hours,
      industry: req.body.industry
    }
  });
  res.status(201).send();
});

module.exports = router;