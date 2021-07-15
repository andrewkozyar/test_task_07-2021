module.exports = {
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost/test_task_07-2021',
    PORT: process.env.PORT || '5000',

    ROOT_EMAIL: process.env.ROOT_EMAIL,
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD
};
