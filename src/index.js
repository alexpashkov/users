const express = require("express");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const usersHandler = require("./usersHandler");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const REQUIRED_ENV_VARS = ["DB_URL", "DB_NAME", "DB_USERNAME", "DB_PASSWORD"];

(async function main() {
  REQUIRED_ENV_VARS.forEach(v => {
    if (!process.env[v]) throw new Error(`${v} is empty`);
  });

  let db;
  try {
    // Use connect method to connect to the Server
    const client = await MongoClient.connect(
      `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`
    );
    db = client.db(process.env.DB_NAME);
    await db.collection("users").createIndex("email");
  } catch (err) {
    throw new Error(`failed to connect to the db: ${err.message}`);
  }

  // we may want to configure some default timeouts here
  const app = express();
  app.use(morgan("combined"));
  app.use(bodyParser.json());
  // handle JSON parsing error
  app.use((err, _, res, __) => res.status(400).send(err.message));
  app.use("/users", usersHandler(db, console));

  const PORT = process.env.PORT || 80;
  app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
})().catch(console.error);
