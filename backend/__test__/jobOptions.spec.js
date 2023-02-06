"use strict";

import JobOptions from "../schema/jobOptions"; // this is the model
import { connectDatabase, testInSession } from "./db-test";
import { set } from "mongoose";
import { beforeAll, describe, expect, it } from "vitest";

set("strictQuery", false);

const exampleJobOptions = {
  cities: ["Example"],
  zips: ["Example"],
  counties: ["Example"],
  positions: ["Example"],
  industries: ["Example"],
};

beforeAll(async () => {
  await connectDatabase();
});

describe("JobOptions documents", () => {
  it(
    "can be saved to the database",
    testInSession(async (session) => {
      await JobOptions.create([exampleJobOptions], { session });
      const savedJob = await JobOptions.findOne().session(session);
      expect(savedJob).toHaveProperty('cities');
      expect(savedJob).toHaveProperty('zips');
      expect(savedJob).toHaveProperty('counties');
      expect(savedJob).toHaveProperty('positions');
      expect(savedJob).toHaveProperty('industries');
    })
  );
});

describe("JobOptions mongo collection", () => {
  it(
    "contains at least 1 document",
    async () => {
      // Dropdowns cannot populate if there is less than 1 set of JobOptions.
      const count = await JobOptions.countDocuments({});
      expect(count).toBeGreaterThanOrEqual(1);
    }
  )
});