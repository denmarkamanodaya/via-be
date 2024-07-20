const Joi = require('joi');

module.exports.userValidation = {
  body: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
  }),
};
