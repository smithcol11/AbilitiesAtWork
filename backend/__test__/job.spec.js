"use strict";

import Job from "../schema/job"; // this is the model
import { connectDatabase, finalizeTest, setupTest } from "./db-test";
import { Error } from "mongoose";
import { afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";

const exampleJob = {
    id: "12345",
    postedBy: "John Doe",
    postedOn: 03/20/2022, 
    editedBy: "Jane Doe",
    editedOn: 03/31/2022,
  
    detail: {
        category: "Delivery", // { type: String, required: true },
        type: "Full-Time", // { type: String, enum: ["Full-Time", "Part-Time"], required: true }, // this was originally worded "Hours per W" from the schema document
        shift: "Morning",
        pay: 20.00, 
        benefits: "Paid time off",
        notes: "n/a", //description
      },
    address: "123 Main st", 
    city: Portland,
    county: "Multnomah", 
    // { timestamps: true }    
};

/*
{
  "_id": {
    "$oid": "639766bb2f6540b8d0711ec2"
  },
  "Business Name": "ABC",
  "Position": "Receptionist",
  "Contact Name": "John Smith",
  "Contact Info": "jsmith@abc.com",
  "Industry": "Marketing",
  "Hours": "Part-Time",
  "Shift": "Day",
  "County": "Multnomah",
  "Address": "123 Main St.",
  "Notes": "Test",
  "Date Posted": {
    "$date": {
      "$numberLong": "1670832000000"
    }
  }
}
*/

let session = null;

beforeAll(async () => {
  await connectDatabase();
});

beforeEach(async () => {
  session = await setupTest();
});

afterEach(async () => {
  await finalizeTest(session);
});

describe("Job document", () => {





});
