const Joi = require("joi");

const schema = Joi.object()
  .required()
  .keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .alphanum()
      .min(7)
      .regex(/[A-Z]/)
      .required(),
    firstName: Joi.string()
      .max(25)
      .required(),
    lastName: Joi.string()
      .max(25)
      .required(),
    city: Joi.string().max(25)
  });

function validateUser(user) {
  const { error } = schema.validate(user);
  if (error) throw error;
}

module.exports = validateUser;
