const Joi = require("joi");

exports.updateUsersSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("free", "pro", "premium").required(),
});
