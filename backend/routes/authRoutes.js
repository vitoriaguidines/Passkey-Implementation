const express = require('express');
const { registerChallenge, register, loginChallenge, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register-challenge', registerChallenge);
router.post('/register', register);
router.post('/login-challenge', loginChallenge);
router.post('/login', login);

module.exports = router;
