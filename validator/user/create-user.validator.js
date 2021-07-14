const Joi = require('joi');

const { regexpEnum } = require('../../constant');

module.exports = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),
    email: Joi
        .string()
        .regex(regexpEnum.EMAIL_REGEXP)
        .required(),
    password: Joi
        .string()
        .regex(regexpEnum.PASSWORD_REGEXP)
        .required(),
    age: Joi
        .number()
        .integer()
        .min(6)
        .max(99),
    avatar: Joi
        .array()
        .items(
            Joi
                .string()
        ),
    status: Joi
        .string()
});
