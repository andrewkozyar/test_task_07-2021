const bcrypt = require('bcrypt');

const { errorMessagesEnum } = require('../constant');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: (password, hashPassword) => {
        const isPasswordEquals = bcrypt.compare(password, hashPassword);

        if (!isPasswordEquals) {
            throw new Error(errorMessagesEnum.wrongEmailOrPassword);
        }
    }
};
