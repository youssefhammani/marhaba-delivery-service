const express = require('express');
const userController = require('../controllers/userController');
const authenticationMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/activate/:email/:token', userController.activateEmail);

router.get('/profile', authenticationMiddleware, userController.getUserProfile);
router.put('/profile', authenticationMiddleware, userController.updateUserProfile);

module.exports = router;
