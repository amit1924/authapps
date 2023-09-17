const express = require('express');
const router = express.Router();
const { showRegisterForm, registerUser } = require('../controllers/registerController');

router.get('/register', showRegisterForm);
router.post('/register', registerUser);

module.exports = router;
