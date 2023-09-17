const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken"); // Add this line for JWT

function showLoginForm(req, res) {
  // res.render("login");
  // Clear the flag from session
  // req.session.registrationSuccess = false;

  const registrationMessage = req.query.message;
  console.log(registrationMessage)
  res.render("login", { registrationMessage });
}

async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      console.log(match)

      if (match) {
        console.log(`Password matched. Login successful!`);
        // Generate a JWT token
        const token = jwt.sign({ user }, process.env.JWT_SECRET, {
          expiresIn: "1h",
         
        });
        

        // Set the token as an httpOnly cookie
        res.cookie("jwt", token, { httpOnly: true, secure: true });

        return res.redirect("/blog");
      }
    }

    res.send("Invalid username or password");
  } catch (err) {
    console.error(`Error in login: ${err}`);
    res.status(500).send("Error in login");
  }
}

module.exports = {
  showLoginForm,
  loginUser,
};
