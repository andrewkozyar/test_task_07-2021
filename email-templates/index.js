const { emailActionsEnum } = require('../constant');

module.exports = {
    [emailActionsEnum.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome on board'
    },
    [emailActionsEnum.GOODBYE]: {
        templateName: 'goodbye',
        subject: 'Thank you. Bye'
    },
    [emailActionsEnum.CHANGEPASSWORD]: {
        templateName: 'changePassword',
        subject: 'Change password'
    }
};
