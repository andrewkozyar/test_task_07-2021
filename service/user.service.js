const { userStatusesEnum } = require('../constant');
const { models: { userModel } } = require('../dataBase');

module.exports = {
    findUsers: () => userModel.find({ status: userStatusesEnum.Active }),

    findByEmail: (email) => userModel.findOne(email),

    findSingleUser: (userID) => userModel.findById(userID),

    createUser: (userObject) => userModel.create(userObject),

    updateUserById: (userId, updateObject) => userModel.updateOne({ _id: userId }, { $set: updateObject })
};
