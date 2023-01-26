const express = require("express");
const router = express.Router();
const Jobs = require("../schema/job")
module.exports = router;

router.get("/GetAllJobs", (req, res) => {
    Jobs.find({})
        .then((data) => {
            console.log(data);
            res.json(data)
        })
        .catch((err) => console.log(err));
    });