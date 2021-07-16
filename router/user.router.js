const router = require('express').Router();

const { userController } = require('../controller');
const { authMiddleware, fileMiddleware, userMiddleware } = require('../middleware');

router.get('/', userController.getAllUsers);
router.get('/:userID', userController.getSingleUser);
router.post(
    '/',
    userMiddleware.isUserValid,
    fileMiddleware.checkFileMiddleware,
    userMiddleware.isUserEmailRepeated,
    userController.createUser
);
router.use('/:userID', userMiddleware.isUserIDValid);
router.delete('/:userID', authMiddleware.checkAccessTokenMiddleware, userController.deleteUser);
router.patch(
    '/:userID/avatar',
    fileMiddleware.checkFileMiddleware,
    authMiddleware.checkAccessTokenMiddleware,
    userController.changeAvatar
);
router.post('/:userID/password', authMiddleware.checkAccessTokenMiddleware, userController.sendMailToChangePass);
router.patch(
    '/:userID/password',
    userMiddleware.isPasswordValid,
    authMiddleware.checkAccessTokenMiddleware,
    userController.changePass
);

module.exports = router;
