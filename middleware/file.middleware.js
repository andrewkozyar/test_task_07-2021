const { constants: { PHOTO_MAX_SIZE, PHOTOS_MIMETYPES }, errorMessagesEnum } = require('../constant');

module.exports = {
    checkFileMiddleware: (req, res, next) => {
        try {
            const { files } = req;

            const avatar = [];

            const allFiles = Object.values(files);

            for (let i = 0; i < allFiles.length; i++) {
                const { name, size, mimetype } = allFiles[i];

                if (PHOTOS_MIMETYPES.includes(mimetype)) {
                    if (size > PHOTO_MAX_SIZE) {
                        throw new Error(`File ${name} is too big`);
                    }

                    avatar.push(allFiles[i]);
                } else {
                    throw new Error(errorMessagesEnum.notValidFile);
                }
            }

            req.avatar = avatar;

            next();
        } catch (e) {
            next(e);
        }
    }
};
