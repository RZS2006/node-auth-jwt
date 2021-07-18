const express = require('express');
const authController = require('../controllers/authController');
const { preventAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/signup', preventAuth, authController.signup_get);
router.get('/login', preventAuth, authController.login_get);
router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.delete('/logout', authController.logout_delete);

module.exports = router;
