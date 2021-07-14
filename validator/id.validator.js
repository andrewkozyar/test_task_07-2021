const Joi = require('joi');

module.exports = Joi.object({
    id: Joi
        .string()
        .alphanum()
        .min(24)
        .max(24)
});
