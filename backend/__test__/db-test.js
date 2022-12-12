"use strict";

import { connect, startSession } from "mongoose";
import { expect } from "vitest";

require("dotenv").config();
const uri = process.env.ATLAS_URI;

const connectDatabase = async () => {
  await connect(uri, {
    useNewUrlParser: true,
  });
  //
  await connection.once('open', () => { console.log("database connected")})
  
};

const setupTest = async () => {
  const session = await startSession();
  session.startTransaction();
  expect(session).not.toBeNull();
  return session;
};

const finalizeTest = async (session) => {
  expect(session).not.toBeNull();
  await session.abortTransaction();
  session.endSession();
};

module.exports = { connectDatabase, finalizeTest, setupTest };
