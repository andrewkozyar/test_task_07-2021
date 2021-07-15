const bcrypt = require('bcrypt');

const { errorMessagesEnum } = require('../constant');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hashPassword) => {
        const isPasswordEquals = await bcrypt.compare(password, hashPassword);

        if (!isPasswordEquals) {
            throw new Error(errorMessagesEnum.wrongEmailOrPassword);
        }
    }
};
