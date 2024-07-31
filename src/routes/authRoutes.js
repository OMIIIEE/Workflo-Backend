const express = require('express');
const { signup, login, getUserDetails } = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/signup', signup);
router.post('/login', login);
router.get('/user', authenticate, getUserDetails);

module.exports = router;
