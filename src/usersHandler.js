const express = require("express");
const usersInternal = require("./usersInternal");

function createUserHandler(db) {
  return (req, res) => {
    usersInternal.create(db, req.body);
  };
}

function getUsersHandler(db) {
  return (req, res) => {
    usersInternal.get(db, req.query.search);
  };
}

function updateUserHandler(db) {
  return (req, res) => {
    usersInternal.update(db, req.params.email, req.body);
  };
}

function deleteUserHandler(db) {
  return (req, res) => {
    usersInternal.delete(db, req.params.email);
  };
}

module.exports = function usersHandler(db) {
  const router = express.Router();
  router.post("/", createUserHandler(db));
  router.get("/", getUsersHandler(db));
  router.put("/:email", updateUserHandler(db));
  router.delete("/:email", deleteUserHandler(db));
  return router;
};
