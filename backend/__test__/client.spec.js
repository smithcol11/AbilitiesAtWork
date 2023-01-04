"use strict";

import client from "../schema/client";
import { connectDatabase, testInSession } from "./db-test";
import { set } from "mongoose";
import { beforeAll, describe, expect, it } from "vitest";

set("strictQuery", false);

const client1Test = {
  userID: 1234,
  initials: "EX",
  preference: {
    industry: ["EX", "AM", "PLE"],
    hours: "Part-Time",
  },
  savedJobs: "EXAMPLE",
  appliedJobs: "EXAMPLE",
  postedBy: "EXAMPLE",
  postedOn: new Date(),
  editedBy: "EXAMPLE",
  editedOn: new Date(),
};

beforeAll(async () => {
  await connectDatabase();
});

describe("Client model", () => {
  it(
    "should create, save and retrieve the client successfully with valid data",
    testInSession(async (session) => {
      const validClient = new client(client1Test);
      const savedClient = await validClient.save({ session });

      expect(savedClient.userID).toBe(client1Test.userID);

      expect(savedClient.initials).toBe(client1Test.initials);
      expect(savedClient.initials.length).toBeGreaterThanOrEqual(2);

      expect(savedClient.preference.industry.length).toBeGreaterThanOrEqual(1);
      savedClient.preference.industry.forEach((item) => {
        expect(client1Test.preference.industry).toContain(item);
      });
      expect(Array.isArray(savedClient.preference.industry));
      expect(savedClient.preference.industry.isMongooseArray);
      expect(savedClient.preference.industry.isMongooseDocumentArray);

      expect(savedClient.preference.hours).toBe(client1Test.preference.hours);

      expect(savedClient.savedJobs).toBe(client1Test.savedJobs);

      expect(savedClient.appliedJobs).toBe(client1Test.appliedJobs);

      expect(savedClient.postedBy).toBe(client1Test.postedBy);

      expect(savedClient.postedOn).toBe(client1Test.postedOn);

      expect(savedClient.editedBy).toBe(client1Test.editedBy);

      expect(savedClient.editedOn).toBe(client1Test.editedOn);
    })
  );

  it(
    "should only contain fields in the schema",
    testInSession(async (session) => {
      const clientWithExtraField = new client({
        extraField: "Extra Field",
        ...client1Test,
      });
      const savedClient = await clientWithExtraField.save({ session });
      expect(savedClient.extraField).toBeUndefined();
    })
  );
});
