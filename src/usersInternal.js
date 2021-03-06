const BadRequestError = require("./BadRequestError");
const COLLECTION_NAME = "users";

const DUPLICATE_KEY_CODE = 11000;

async function create(db, user) {
  // for production we should encrypt user password here
  try {
    await db.collection(COLLECTION_NAME).insertOne(user);
  } catch (e) {
    if (e.code === DUPLICATE_KEY_CODE) {
      throw new BadRequestError("user with such email already exists");
    }
    throw e;
  }
}

async function get(db, search) {
  // we may want to remove internal _id field here
  return db
    .collection(COLLECTION_NAME)
    .find(searchQuery(search))
    .toArray();
}

function searchQuery(search) {
  if (!search) return {};
  const re = new RegExp(search, "i");
  return {
    $or: ["email", "firstName", "lastName", "city"].map(prop => ({
      [prop]: re
    }))
  };
}

async function update(db, email, user) {
  const res = await db.collection(COLLECTION_NAME).updateOne(
    {
      email
    },
    { $set: user }
  );
  if (!res.matchedCount) throw new BadRequestError("no such user");
}

async function deleteUser(db, email) {
  return db.collection(COLLECTION_NAME).deleteOne({
    email
  });
}

module.exports = {
  create,
  get,
  update,
  delete: deleteUser
};
