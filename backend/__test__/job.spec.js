"use strict";

import Job from "../schema/job"; // this is the model
import { connectDatabase, testInSession } from "./db-test";
import { set } from "mongoose";
import { beforeAll, describe, expect, it } from "vitest";

set("strictQuery", false);

const exampleJob1 = {
  openingDate: new Date(),
  enteredBy: "John Doe",
  updatedBy: "Jane Doe",
  employer: "TriMet",
  industry: "Transportation",
  position: "Bus Driver",
  timeCommitment: "Full-Time",
  shift: "Morning",
  hourlyWage: 27.0,
  benefits: "Paid time off",
  notes: "n/a",
  address: "123 Main st",
  city: "Portland",
  zip: "97201",
  county: "Multnomah",
  contact: {
    email: "abc@xyz.com",
    name: "Buzz Lightyear",
    phone: "0008675309",
  },
};

const exampleJob2 = {
  openingDate: new Date(),
  enteredBy: "John Smith",
  updatedBy: "Jane Smith",
  employer: "City of Portland",
  industry: "Administrative",
  position: "Clerk",
  timeCommitment: "Part-Time",
  shift: "Afternoon",
  hourlyWage: 21.0,
  benefits: "Health insurance",
  notes: "n/a", //description
  address: "1 First st",
  city: "Hillsboro",
  zip: "97201",
  county: "Washington",
  contact: {
    email: "abc@xyz.com",
    name: "Buzz Lightyear",
    phone: "0008675309",
  },
};

beforeAll(async () => {
  await connectDatabase();
});

describe("Job document", () => {
  it(
    "can be saved and retrieved",
    testInSession(async (session) => {
      await Job.create([exampleJob1], { session });
<<<<<<< HEAD
      const criteria = { postedBy: exampleJob1.postedBy };
      const savedJob = await Job.findOne(criteria).session(session);
      expect(savedJob.id).toBe(exampleJob1.id);
=======
      const criteria = { enteredBy: exampleJob1.enteredBy };
      const savedJob = await Job.findOne(criteria).session(session);
      expect(savedJob.updatedBy).toBe(exampleJob1.updatedBy);
>>>>>>> main
    })
  );

  it(
    "should find and return correct job id using contactName",
    testInSession(async (session) => {
      const savedJobs = await Job.create([exampleJob1, exampleJob2], {
        session,
      });
      expect(new Set(savedJobs).size).toEqual(2);

      const jobToFind = await Job.findOne({ enteredBy: "John Smith" }).session(
        session
      );
      expect(jobToFind.enteredBy).toBe(exampleJob2.enteredBy);
    })
  );

  it(
    "should find and return null if job does not exist using contactName",
    testInSession(async (session) => {
      const savedJobs = await Job.create([exampleJob1, exampleJob2], {
        session,
      });
      expect(new Set(savedJobs).size).toEqual(2);

      const jobToFind = await Job.findOne({ updatedBy: "Ben" }).session(
        session
      );
      expect(jobToFind).toBe(null);
    })
  );
});
