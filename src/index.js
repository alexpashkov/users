const express = require("express");
require("dotenv").config();
const usersHandler = require("./usersHandler");

function run() {
  const db = null;
  const app = express();
  app.use("/users", usersHandler(db));

  const PORT = process.env.PORT || 80;
  app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
}

run();
