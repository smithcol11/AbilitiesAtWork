"use strict";

import Company from "../schema/company";
import { connectDatabase, finalizeTest, setupTest } from "./db-test";
import { Error } from "mongoose";
import { afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";

const exampleCompany = {
  companyName: "Example Corporation",
  address: "Example Address",
  postedBy: "Example Poster",
  postedOn: new Date(),
  editedBy: "Example Editor",
  editedOn: new Date(),
  contactName: "Example Contact",
  email: "example email",
  phone: 5038675309,
  other: "Example Other Field",
  jobs: [],
};

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

describe("Company documents", () => {
  it("can be saved to and retrieved from the database", async () => {
    // Save to database
    await Company.create([exampleCompany], { session });

    // Retrieve from database
    const savedCompany = await Company.findOne().session(session);

    expect(savedCompany.companyName).toBe(exampleCompany.companyName);
  });

  it("should require an email address", async () => {
    const { email, ...theRest } = exampleCompany;

    try {
      await Company.create([theRest], { session });
    } catch (error) {
      expect(error).toBeInstanceOf(Error.ValidationError);
      expect(error.errors.email).toBeDefined();
    }
  });

  it("should reject duplicate email addresses", async () => {
    await Company.create([exampleCompany], { session });

    const addDuplicate = async () => {
      await Company.create([exampleCompany], { session });
    };

    await expect(addDuplicate).rejects.toThrow("duplicate key");
  });

  it("should only contain fields in the schema", async () => {
    const companyWithExtraField = new Company({
      extraField: "Extra Field",
      ...exampleCompany,
    });

    const savedCompany = await companyWithExtraField.save({ session });

    expect(savedCompany.extraField).toBeUndefined();
    expect(savedCompany.companyName).toBe(exampleCompany.companyName);
  });
});