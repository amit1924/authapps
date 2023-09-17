const express = require('express');
const router = express.Router();
const { showLoginForm, loginUser } = require('../controllers/loginController');

router.get('/login', showLoginForm);
router.post('/login', loginUser);

module.exports = router;
