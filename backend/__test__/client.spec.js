"use strict";

import client from "../schema/client";
import { connectDatabase, finalizeTest, setupTest } from "./db-test";
import { afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";

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

/*
const client2Test = {
   userID: "",
   initials: "",
   preference: {
     industry: [],
     hours: ""
   },
   savedJobs: "",
   appliedJobs: "",
   postedBy: "",
   postedOn: "",
   editedBy: "",
   editedOn: "",
};
*/

beforeAll(async () => {
  await connectDatabase();
});

beforeEach(async () => {
  await setupTest();
});

afterEach(async () => {
  await finalizeTest();
});

describe("Client model", () => {
  it("should create, save and retrieve the client successfully with valid data", async () => {
    const validClient = new client(client1Test);
    const savedClient = await validClient.save();

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
  });
  it("should only contain fields in the schema", async () => {
    const clientWithExtraField = new client({
      extraField: "Extra Field",
      ...client1Test,
    });
    const savedClient = await clientWithExtraField.save();
    expect(savedClient.extraField).toBeUndefined();
  });
});
