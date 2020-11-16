const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

exports.updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
}).min(1);

exports.validateIdSchema = Joi.object({
  id: Joi.objectId(),
});
