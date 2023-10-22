const express = require('express');
const authController = require('../controllers/authController');
const authUtils = require('../utils/authUtils');

const router = express.Router();


router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgetpassword', authController.forgetPassword);
router.put('/resetpassword', authUtils.verifyToken, authController.resetPassword);
router.get('/confirm/:token', authUtils.verifyToken, authController.resetPassword);
// router.post('/logout', authController.logout);

module.exports = router;


