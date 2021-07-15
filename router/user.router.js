const router = require('express').Router();

const { userController } = require('../controller');
const { authMiddleware, fileMiddleware, userMiddleware } = require('../middleware');

router.get('/', userController.getAllUsers);
router.get('/:userID', userController.getSingleUser);
router.post(
    '/',
    userMiddleware.isUserEmailRepeated,
    userMiddleware.isUserValid,
    fileMiddleware.checkFileMiddleware,
    userController.createUser
);
router.use('/:userID', userMiddleware.isUserIDValid);
router.delete('/:userID', authMiddleware.checkAccessTokenMiddleware, userController.deleteUser);
router.patch(
    '/:userID/avatar',
    authMiddleware.checkAccessTokenMiddleware,
    fileMiddleware.checkFileMiddleware,
    userController.changeAvatar
);
router.post('/:userID/password', authMiddleware.checkAccessTokenMiddleware, userController.sendMailToChangePass);
router.patch('/:userID/password', authMiddleware.checkAccessTokenMiddleware, userController.changePass);

module.exports = router;
