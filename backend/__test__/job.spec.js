"use strict";

import Job from "../schema/job"; // this is the model
import { connectDatabase, testInSession } from "./db-test";
import { set } from "mongoose";
import { beforeAll, describe, expect, it } from "vitest";

set("strictQuery", false);

const exampleJob1 = {
  contactName: "Jane Doe",
  businessName: "Sample Company 1",
  industry: "Sample Industry",
  position: "Temp position",
  shift: "Moring",
  hours: "9-5",
  city: "Portland",
  zip: "97201",
  date: new Date(),
  address: "123 Main",
  county: "Multnomah",
  notes: "n/a",
  contactEmail: "123@456.com",
  contactPhoneNumber: "123-456-7890",
};

const exampleJob2 = {
  contactName: "John Smith",
  businessName: "Sample Company 2",
  industry: "Sample Industry",
  position: "Temp position",
  shift: "Moring",
  hours: "9-5",
  city: "Portland",
  zip: "97201",
  date: new Date(),
  address: "123 Main",
  county: "Multnomah",
  notes: "n/a",
  contactEmail: "123@456.com",
  contactPhoneNumber: "123-456-7890",
};

beforeAll(async () => {
  await connectDatabase();
});

describe("Job document", () => {
  it(
    "can be saved and retrieved",
    testInSession(async (session) => {
      await Job.create([exampleJob1], { session });
      const savedJob = await Job.findOne().session(session);
      expect(savedJob.contactName).toBe(exampleJob1.contactName);
    })
  );

  it(
    "should find and return correct job id using contactName",
    testInSession(async (session) => {
      const savedJobs = await Job.create([exampleJob1, exampleJob2], {
        session,
      });
      expect(new Set(savedJobs).size).toEqual(2);

      const jobToFind = await Job.findOne({ contactName: "John Smith" }).session(
        session
      );
      expect(jobToFind.businessName).toBe(exampleJob2.businessName);
    })
  );

  it(
    "should find and return null if job does not exist using contactName",
    testInSession(async (session) => {
      const savedJobs = await Job.create([exampleJob1, exampleJob2], {
        session,
      });
      expect(new Set(savedJobs).size).toEqual(2);

      const jobToFind = await Job.findOne({ contactName: "Ben" }).session(session);
      expect(jobToFind).toBe(null);
    })
  );
});
