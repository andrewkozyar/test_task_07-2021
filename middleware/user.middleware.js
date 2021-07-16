const { errorMessagesEnum } = require('../constant');
const { idValidator, userValidators } = require('../validator');
const { userService: { findByEmail } } = require('../service');

module.exports = {
    isUserIDValid: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const { error } = await idValidator.validate(userId);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserValid: async (req, res, next) => {
        try {
            const { error } = await userValidators.createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserEmailRepeated: async (req, res, next) => {
        try {
            const { email } = req.body;

            const user = await findByEmail({ email });

            if (user && user.email === email) {
                throw new Error(errorMessagesEnum.emailIsRepeated);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isPasswordValid: async (req, res, next) => {
        try {
            const { error } = await userValidators.passwordValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
