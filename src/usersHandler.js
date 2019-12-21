const express = require("express");
const usersInternal = require("./usersInternal");
const validateUser = require("./validateUser");

function createUserHandler(db, logger) {
  return async (req, res) => {
    const err = validateUser(req.body);
    if (err) {
      res.status(400).send(err);
      return;
    }
    try {
      await usersInternal.create(db, req.body);
      res.send();
    } catch (e) {
      logger.error(e);
      res.sendStatus(500);
    }
  };
}

function getUsersHandler(db, logger) {
  return async (req, res) => {
    try {
      const users = await usersInternal.get(db, req.query.search);
      res.send(users);
    } catch (e) {
      logger.error(e);
      res.sendStatus(500);
    }
  };
}

function updateUserHandler(db, logger) {
  return async (req, res) => {
    const err = validateUser(req.body);
    if (err) {
      res.status(400).send(err);
      return;
    }
    try {
      await usersInternal.update(db, req.params.email, req.body);
      res.send();
    } catch (e) {
      logger.error(e);
      res.sendStatus(500);
    }
  };
}

function deleteUserHandler(db, logger) {
  return async (req, res) => {
    try {
      await usersInternal.delete(db, req.params.email);
      res.send();
    } catch (e) {
      logger.error(e);
      res.sendStatus(500);
    }
  };
}

module.exports = function usersHandler(db) {
  const router = express.Router();
  router.post("/", createUserHandler(db, console));
  router.get("/", getUsersHandler(db, console));
  router.put("/:email", updateUserHandler(db, console));
  router.delete("/:email", deleteUserHandler(db, console));
  return router;
};
