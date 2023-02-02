"use strict";

const express = require("express");
const router = express.Router();
const Client = require("../schema/client");

// router.use(
//     session({
//         secret: process.env.SESSION_SECRET,
//         resave: false,
//         saveUninitialized: false,
//         store: MongoStore.create({ mongoUrl: process.env.ATLAS_URI}),
//     })
// );

// router.use(
//     cors({
//         origin: "http://localhost:8080",
//         methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
//         credentials: true,
//     })
// );

// router.post("/verifyJWT", (req, res) => {
//     if (req.cookies.token) {
//       let result = jwt.verify(req.cookies.token, process.env.SESSION_SECRET);
//       if (result == "admin") {
//         res.json({ auth: true, admin: true });
//       } else if (result) {
//         res.json({ auth: true, admin: false });
//       } else res.json({ auth: false, admin: false });
//     }
//   });

router.post("/addClient", async (req, res) => {
  await Client.insertMany({
    intials: req.body.initials,
    preferece: {
      hours: req.body.hours,
      industry: req.body.industry
    }
  });
  res.status(201).send();
});

module.exports = router;