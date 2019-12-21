const express = require("express");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const usersHandler = require("./usersHandler");
const bodyParser = require("body-parser");

(async function main() {
  if (!process.env.DB_URL) throw new Error("DB_URL is empty");
  if (!process.env.DB_NAME) throw new Error("DB_NAME is empty");
  if (!process.env.DB_USERNAME) throw new Error("DB_USERNAME is empty");
  if (!process.env.DB_PASSWORD) throw new Error("DB_PASSWORD is empty");

  let db;
  try {
    // Use connect method to connect to the Server
    const client = await MongoClient.connect(
      `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${
        process.env.DB_URL
      }`,
      {}
    );
    db = client.db(process.env.DB_NAME);
  } catch (err) {
    throw new Error(`failed to connect to the db: ${err.message}`);
  }

  const app = express();
  app.use(bodyParser.json());
  app.use("/users", usersHandler(db));

  const PORT = process.env.PORT || 80;
  app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
})().catch(console.error);
