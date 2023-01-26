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

  contactName: "abc",
  contactEmail: "abc@pdx.edu",
  contactPhoneNumber: "0008675309",

  businessName: "venusaur",
  position: "best",
  industry: "pokemon",
  shift: "Morning",
  hours: "Full-Time",
  pay: 20.0,
  city: "Portland",
  zip: "11111",
  date: new Date(),
  address: "123 Main st",
  county: "Multnomah",
  notes: "n/a",
};

const exampleJob2 = {
  id: "12345",
  postedBy: "John Smith",
  postedOn: new Date(),
  editedBy: "Jane Smith",
  editedOn: new Date(),

  contactName: "abcx",
  contactEmail: "abcx@pdx.edu",
  contactPhoneNumber: "0008675309",

  businessName: "business",
  position: "clerk",
  industry: "industry",
  shift: "Afternoon",
  hours: "Full-Time",
  pay: 21.0,
  city: "Hillsboro",
  zip: "11111",
  date: new Date(),
  address: "1 First st",
  county: "Washington",
  notes: "n/a",
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
