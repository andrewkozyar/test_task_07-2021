const jwt = require('jsonwebtoken');

const { JWT_ACCESS_SECRET } = require('../config/config');
const { constants: { AUTHORIZATION }, errorMessagesEnum, userStatusesEnum } = require('../constant');
const { oAuthService, userService } = require('../service');

module.exports = {
    checkAccessTokenMiddleware: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            if (!access_token) {
                throw new Error(errorMessagesEnum.requiredToken);
            }

            const tokens = await oAuthService.findTokens({ access_token }).populate('_user_id');

            if (!tokens) {
                throw new Error(errorMessagesEnum.notValidToken);
            }

            jwt.verify(access_token, JWT_ACCESS_SECRET, (err) => {
                if (err) {
                    throw new Error(errorMessagesEnum.notValidToken);
                }
            });

            req.user = tokens._user_id;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkIsAccountActive: async (req, res, next) => {
        try {
            const { email } = req.body;

            const user = await userService.findByEmail({ email });

            if (user && user.status !== userStatusesEnum.Active) {
                throw new Error(errorMessagesEnum.forbidden);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
