const express = require('express');
const authController = require('../controllers/authController');
const authUtils = require('../utils/authUtils');
const userController = require('../controllers/userController');

const router = express.Router();


router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authUtils.verifyToken, authController.resetPassword);
router.get('/confirm-email/:token', authUtils.verifyToken, userController.activateEmail);
// router.post('/logout', authController.logout);

module.exports = router;


