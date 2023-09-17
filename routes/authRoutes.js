const path = require("path");
const { logoutUser } = require("../controllers/logoutController");
const { registerUser } = require('../controllers/registerController');
const { loginUser } = require('../controllers/loginController');


const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const verifyToken = require("../middleware/verifyToken"); // Add this line

// const router = express.Router();
// console.log(router)
// // Register a new user
// router.post("/register", async (req, res) => {
//   // (Code for user registration)
// });

// // Login a user and generate a JWT token
// router.post("/login", async (req, res) => {
//   // (Code for user login with JWT)
// });

// // Logout a user by clearing the JWT cookie
// router.get("/logout", logoutUser);

// // Protected route (requires authentication)
// router.get("/blog", verifyToken, (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "views", "blog.html"));
// });

// module.exports = router;


const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login a user and generate a JWT token
router.post('/login', loginUser);

// Logout a user by clearing the JWT cookie
router.get("/logout", logoutUser);

// Protected route (requires authentication)
router.get("/blog", verifyToken, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "blog.html"));
});

module.exports = router;