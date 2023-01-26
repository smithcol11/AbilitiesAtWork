"use strict";

import Job from "../schema/job"; // this is the model
import { connectDatabase, testInSession } from "./db-test";
import { set } from "mongoose";
import { beforeAll, describe, expect, it } from "vitest";

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

beforeAll(async () => {
  await connectDatabase();
});

describe("Job document", () => {
  it(
    "can be saved and retrieved",
    testInSession(async (session) => {
      await Job.create([exampleJob1], { session });
      const criteria = { postedBy: exampleJob1.postedBy };
      const savedJob = await Job.findOne(criteria).session(session);
      expect(savedJob.id).toBe(exampleJob1.id);
    })
  );

  it(
    "should find and return correct job id using postedBy",
    testInSession(async (session) => {
      const savedJobs = await Job.create([exampleJob1, exampleJob2], {
        session,
      });
      expect(new Set(savedJobs).size).toEqual(2);

      const jobToFind = await Job.findOne({ postedBy: "John Smith" }).session(
        session
      );
      expect(jobToFind.id).toBe(exampleJob2.id);
    })
  );

  it(
    "should find and return null if job does not exist using editedBy",
    testInSession(async (session) => {
      const savedJobs = await Job.create([exampleJob1, exampleJob2], {
        session,
      });
      expect(new Set(savedJobs).size).toEqual(2);

      const jobToFind = await Job.findOne({ editedBy: "Ben" }).session(session);
      expect(jobToFind).toBe(null);
    })
  );
});
