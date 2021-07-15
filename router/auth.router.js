const router = require('express').Router();

const { authController } = require('../controller');
const { authMiddleware } = require('../middleware');

router.post('/', authMiddleware.checkIsAccountActive, authController.authUser);
router.patch('/:userID', authController.activateUser);

module.exports = router;
