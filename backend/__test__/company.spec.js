"use strict";

require("dotenv").config();
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { connect, connection, Error } from "mongoose";
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

beforeAll(() => {
  connect(uri, {
    useNewUrlParser: true,
  });
});

afterEach(() => {
  connection.collections["companies"].deleteMany();
});

afterAll(async () => {
  await connection.dropCollection("companies");
  await connection.close();
});

describe("Company documents", () => {
  it("can be saved to and retrieved from the database", async () => {
    // Save to database
    const validCompany = new Company(exampleCompany);
    await validCompany.save();

    // Retrieve from database
    const query = Company.findOne();
    const sameCompany = await query.exec();
    expect(sameCompany.companyName).toBe(exampleCompany.companyName);
  });

  it("should require an email address", async () => {
    const { email, ...theRest } = exampleCompany;
    const companyWithoutEmail = new Company(theRest);

    try {
      await companyWithoutEmail.save();
    } catch (error) {
      expect(error).toBeInstanceOf(Error.ValidationError);
      expect(error.errors.email).toBeDefined();
    }
  });

  it("should only contain fields in the schema", async () => {
    const companyWithExtraField = new Company({
      extraField: "Extra Field",
      ...exampleCompany,
    });

    const savedCompany = await companyWithExtraField.save();

    expect(savedCompany.companyName).toBe(exampleCompany.companyName);
    expect(savedCompany.extraField).toBeUndefined();
  });
});
