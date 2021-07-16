const { models: { oAuthModel } } = require('../dataBase');

module.exports = {
    findTokens: (access_token) => oAuthModel.findOne(access_token),

    createTokens: (userObject) => oAuthModel.create(userObject)
};
