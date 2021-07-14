const fs = require('fs-extra').promises;

const { passwordHasher } = require('../helper');
const {
    errorMessagesEnum, responseCodesEnum, responseMessagesEnum, userStatusesEnum
} = require('../constant');
const { fileService, userService } = require('../service');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findUsers();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getSingleUser: async (req, res, next) => {
        try {
            const { userID } = req.params;
            const user = await userService.findSingleUser(userID);

            if (user.status === userStatusesEnum.Active) {
                res.json(user);
            } else {
                throw new Error(errorMessagesEnum.forbidden);
            }
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { body: { password }, avatar } = req;

            const hashPassword = await passwordHasher.hash(password);

            const user = await userService.createUser({ ...req.body, password: hashPassword });

            if (avatar) {
                const avatarsPath = [];
                for (let i = 0; i < avatar.length; i++) {
                    const { finalPath, uploadPath, dirPath } = fileService.pathDirBuilder(
                        avatar[i].name, user._id, 'photos', 'user'
                    );

                    await fs.mkdir(dirPath, { recursive: true });
                    await avatar[i].mv(finalPath);

                    avatarsPath.push(uploadPath);
                }
                await userService.updateUserById(user._id, { avatar: avatarsPath });
            }

            res.status(responseCodesEnum.CREATED).json(responseMessagesEnum.create);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { userID } = req.params;
            await userService.updateUserById(userID, { status: userStatusesEnum.Deleted });

            res.status(responseCodesEnum.DELETED).json(responseMessagesEnum.delete);
        } catch (e) {
            next(e);
        }
    },

    changeAvatar: async (req, res, next) => {
        try {
            const { params: { userID }, avatar } = req;

            const user = await userService.findSingleUser(userID);
            for (let i = 0; i < avatar.length; i++) {
                const { finalPath, uploadPath, dirPath } = fileService.pathDirBuilder(
                    avatar[i].name, userID, 'photos', 'user'
                );

                await fs.mkdir(dirPath, { recursive: true });
                await avatar[i].mv(finalPath);

                user.avatar.push(uploadPath);
            }
            await userService.updateUserById(userID, { avatar: user.avatar });

            res.status(responseCodesEnum.DELETED).json(responseMessagesEnum.delete);
        } catch (e) {
            next(e);
        }
    }
};
