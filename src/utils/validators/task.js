const Joi = require('joi');

module.exports.taskValidation = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    assigned_to: Joi.string().optional(),
    priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH').optional(),
    status: Joi.string().valid('OPEN', 'CLOSED').optional(),
  }),
};
