"use strict";

import client from "../schema/client";
import { connectDatabase, testInSession } from "./dbTest";
import { set } from "mongoose";
import { beforeAll, describe, expect, it } from "vitest";

set("strictQuery", false);

const client1Test = {
  firstName: "name",
  middleInitial: "m",
  lastInitial: "l",
  industry: ["EX", "AM", "PLE"],
  hours: "Part-Time",
  appliedJobs: [],
  enteredBy: "EXAMPLE",
  updatedBy: "EXAMPLE",
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

      expect(savedClient.firstName).toBe(client1Test.firstName);
      expect(savedClient.middleInitial.length).toEqual(1);
      expect(savedClient.lastInitial.length).toEqual(1);

      expect(savedClient.industry.length).toBeGreaterThanOrEqual(1);
      savedClient.industry.forEach((item) => {
        expect(client1Test.industry).toContain(item);
      });
      expect(Array.isArray(savedClient.industry));
      expect(savedClient.industry.isMongooseArray);
      expect(savedClient.industry.isMongooseDocumentArray);

      expect(savedClient.hours).toBe(client1Test.hours);

      expect(savedClient.appliedJobs).toStrictEqual(client1Test.appliedJobs);

      expect(savedClient.postedBy).toBe(client1Test.postedBy);
      expect(savedClient.editedBy).toBe(client1Test.editedBy);
      expect(savedClient).toHaveProperty('createdAt');
      expect(savedClient).toHaveProperty('updatedAt');
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
