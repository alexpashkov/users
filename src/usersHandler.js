const express = require("express");
const usersInternal = require("./usersInternal");
const validateUser = require("./validateUser");
const BadRequestError = require("./BadRequestError");

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
      if (e instanceof BadRequestError) {
        logger.error(`user creation failed: ${e.message}`);
        res.status(400).send(e.message);
        return;
      }
      throw e; // handle the error further down
    }
  };
}

function getUsersHandler(db) {
  return async (req, res) => {
    res.send(await usersInternal.get(db, req.query.search));
  };
}

function updateUserHandler(db) {
  return async (req, res) => {
    const err = validateUser(req.body);
    if (err) {
      res.status(400).send(err);
      return;
    }
    await usersInternal.update(db, req.params.email, req.body);
    res.send();
  };
}

function deleteUserHandler(db) {
  return async (req, res) => {
    await usersInternal.delete(db, req.params.email);
    res.send();
  };
}

function asyncErrorHandler(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (e) {
      next(e);
    }
  };
}

module.exports = function usersHandler(db, logger) {
  const router = express.Router();
  router.post("/", asyncErrorHandler(createUserHandler(db, logger)));
  router.get("/", asyncErrorHandler(getUsersHandler(db)));
  router.put("/:email", asyncErrorHandler(updateUserHandler(db)));
  router.delete("/:email", asyncErrorHandler(deleteUserHandler(db)));
  router.use((err, req, res, _) => {
    const errorMessage = err ? err.message : "unknown error";
    logger.error(`request to ${req.originalUrl} failed: ${errorMessage}`);
    res.sendStatus(500);
  });
  return router;
};
