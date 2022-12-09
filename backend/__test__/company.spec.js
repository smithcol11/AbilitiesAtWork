"use strict";

require("dotenv").config();
import { afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { connect, Error, startSession } from "mongoose";
import Company from "../schema/company";

const uri = process.env.ATLAS_URI;

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

beforeAll(() => {
  connect(uri, {
    useNewUrlParser: true,
  });
});

beforeEach(async () => {
  session = await startSession();
  session.startTransaction();
});

afterEach(async () => {
  await session.abortTransaction();
  session.endSession();
});

describe("Company documents", () => {
  it("can be saved to and retrieved from the database", async () => {
    // Save to database
    await Company.create([exampleCompany], { session });

    // Retrieve from database
    const compFromDB = await Company.findOne().session(session);

    expect(compFromDB.companyName).toBe(exampleCompany.companyName);
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

    const savedDoc = await companyWithExtraField.save({ session });

    expect(savedDoc.extraField).toBeUndefined();
    expect(savedDoc.companyName).toBe(exampleCompany.companyName);
  });
});
