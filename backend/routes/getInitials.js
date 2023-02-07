"use strict";

const express = require("express");
const router = express.Router();
const Client = require("../schema/client");

router.get("/getInitials", (req, res) => {
  Client.find({})
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => console.log(err));
});
