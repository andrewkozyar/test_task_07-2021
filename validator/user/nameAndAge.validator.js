const Joi = require('joi');

const { regexpEnum } = require('../../constant');

module.exports = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),
    age: Joi
        .number()
        .integer()
        .min(6)
        .max(99)
});
