"use strict";

import Job from "../schema/job"; // this is the model
import { connectDatabase, finalizeTest, setupTest } from "./db-test";
import { set } from "mongoose";
import { afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";

set("strictQuery", false);

const exampleJob1 = {
  id: "12345",
  postedBy: "John Doe",
  postedOn: new Date(),
  editedBy: "Jane Doe",
  editedOn: new Date(),

  detail: {
    category: "Delivery", // { type: String, required: true },
    type: "Full-Time", // { type: String, enum: ["Full-Time", "Part-Time"], required: true }, // this was originally worded "Hours per W" from the schema document
    shift: "Morning",
    pay: 20.0,
    benefits: "Paid time off",
    notes: "n/a", //description
  },
  address: "123 Main st",
  city: "Portland",
  county: "Multnomah",
  // { timestamps: true }
};

const exampleJob2 = {
  id: "54321",
  postedBy: "John Smith",
  postedOn: new Date(),
  editedBy: "Jane Smith",
  editedOn: new Date(),

  detail: {
    category: "Clerk", // { type: String, required: true },
    type: "Part-Time", // { type: String, enum: ["Full-Time", "Part-Time"], required: true }, // this was originally worded "Hours per W" from the schema document
    shift: "Afternoon",
    pay: 21.0,
    benefits: "Health insurance",
    notes: "n/a", //description
  },
  address: "1 First st",
  city: "Hillsboro",
  county: "Washington",
  // { timestamps: true }
};

// const exampleJob =
// {
//   "_id": {
//     "$oid": "639766bb2f6540b8d0711ec2"
//   },
//   "Business Name": "ABC",
//   "Position": "Receptionist",
//   "Contact Name": "John Smith",
//   "Contact Info": "jsmith@abc.com",
//   "Industry": "Marketing",
//   "Hours": "Part-Time",
//   "Shift": "Day",
//   "County": "Multnomah",
//   "Address": "123 Main St.",
//   "Notes": "Test",
//   "Date Posted": {
//     "$date": {
//       "$numberLong": "1670832000000"
//     }
//   }
// }

beforeAll(async () => {
  await connectDatabase();
});

beforeEach(async () => {
  await setupTest();
});

afterEach(async () => {
  await finalizeTest();
});

describe("Job document", () => {
  it("can be saved and retrieved", async () => {
    await Job.create([exampleJob1]);
    const savedJob = await Job.findOne();
    expect(savedJob.id).toBe(exampleJob1.id);
  });

  it("should find and return correct job id using postedBy", async () => {
    const savedJobs = await Job.create([exampleJob1, exampleJob2]);
    await expect(new Set(savedJobs).size).toEqual(2);

    const jobToFind = await Job.findOne({ postedBy: "John Smith" });
    await expect(jobToFind.id).toBe(exampleJob2.id);
  });

  it("should find and return null if job does not exist using editedBy", async () => {
    const savedJobs = await Job.create([exampleJob1, exampleJob2]);
    await expect(new Set(savedJobs).size).toEqual(2);

    const jobToFind = await Job.findOne({ editedBy: "Ben" });
    expect(jobToFind).toBe(null);
  });
});
