"use strict";

import { MongoMemoryServer } from "mongodb-memory-server";
import { connect, connection } from "mongoose";

let mongo = undefined;

const connectDatabase = async () => {
  mongo = await MongoMemoryServer.create();
  const url = mongo.getUri();

  await connect(url, {
    useNewUrlParser: true,
  });
};

const setupTest = async () => {

};

const finalizeTest = async () => {
  if (mongo) {
    const collections = connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
  }
};

module.exports = { connectDatabase, finalizeTest, setupTest };
