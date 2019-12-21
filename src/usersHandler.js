const express = require("express");

function createUserHandler(db) {
  return (req, res) => res.send("not implemented");
}

function getUsersHandler(db) {
  return (req, res) => res.send("not implemented");
}

function updateUserHandler(db) {
  return (req, res) => res.send("not implemented");
}

function deleteUserHandler(db) {
  return (req, res) => res.send("not implemented");
}

module.exports = function usersHandler(db) {
  const router = express.Router();
  router.post("/", createUserHandler(db));
  router.get("/", getUsersHandler(db));
  router.put("/:email", updateUserHandler(db));
  router.delete("/:email", deleteUserHandler(db));
  return router;
};
