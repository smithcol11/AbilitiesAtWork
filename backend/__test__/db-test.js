"use strict";

import { connect, connection } from "mongoose";

require("dotenv").config();
const uri = process.env.ATLAS_URI;

const connectDatabase = async () => {
  await connect(uri, {
    useNewUrlParser: true,
  });
};

const testInSession = (testFunc) => {
  return async () => {
    const session = await connection.startSession();

    try {
      await session.withTransaction(async () => {
        const possiblePromise = testFunc(session);

        if (possiblePromise instanceof Promise) {
          await possiblePromise;
        }

        throw "abort";
      });
    } catch (error) {
      if (error != "abort") {
        throw error;
      }
    }

    await session.endSession();
  };
};

module.exports = { connectDatabase, testInSession };
