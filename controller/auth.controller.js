const { userService, oAuthService } = require('../service');
const { passwordHasher, tokenizer } = require('../helper');
const {
    errorMessagesEnum, responseCodesEnum, responseMessagesEnum, userStatusesEnum
} = require('../constant');

module.exports = {
    authUser: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await userService.findByEmail({ email }).select('+password');

            if (!user) {
                throw new Error(errorMessagesEnum.noUser);
            }

            await passwordHasher.compare(password, user.password);

            const tokens = tokenizer();

            await oAuthService.createTokens({ ...tokens, user: user._id });

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    },

    activateUser: async (req, res, next) => {
        try {
            const { userID } = req.params;

            await userService.updateUserById(userID, { status: userStatusesEnum.Active });

            res.status(responseCodesEnum.OK).json(responseMessagesEnum.activateUser);
        } catch (e) {
            next(e);
        }
    }
};
