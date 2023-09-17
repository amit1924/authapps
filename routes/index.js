const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');

router.get('/', (req, res) => {
    res.render('login');
});

router.get('/register', registerController.showRegisterForm);

router.post('/register', registerController.registerUser);

router.post('/login', loginController.loginUser);

module.exports = router;
