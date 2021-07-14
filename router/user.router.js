const router = require('express').Router();

const userController = require('../controller/user.controller');
const { fileMiddleware, userMiddleware } = require('../middleware');

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
router.delete('/:userID', userController.deleteUser);
router.patch('/:userID/avatar', fileMiddleware.checkFileMiddleware, userController.changeAvatar);

module.exports = router;
