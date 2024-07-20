const Joi = require('joi');

module.exports.projectValidation = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    members: Joi.array().optional(),
  }),
};
