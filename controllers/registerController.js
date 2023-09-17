const bcrypt = require('bcrypt');
const User = require('../models/userModel');

function showRegisterForm(req, res) {
    res.render('register');
}

async function registerUser(req, res) {
    const { name, email, username, password } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            return res.status(400).send('User with this email or username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, username, password: hashedPassword });

        await user.save();

        req.session.user = user;
        // req.session.registrationSuccess = true;
        res.redirect('/login?message=User+has+been+registered+Successfully');
    } catch (error) {
        res.status(500).send('Error in registering user');
    }
}

module.exports = {
    showRegisterForm,
    registerUser
};
