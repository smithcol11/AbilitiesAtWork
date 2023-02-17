"use strict";

const initialJobOptions = require("./initialJobOptions.json");
const JobOptions =  require("./schema/jobOptions");
const { connectDatabase } = require("./__test__/dbTest");
const { set } = require("mongoose");

set("strictQuery", false);

let initializeJobOptions = async () => {
    await connectDatabase();
    const count = await JobOptions.countDocuments({});
    if (count < 1) {
        await JobOptions.create([initialJobOptions]);
    }
};

initializeJobOptions();