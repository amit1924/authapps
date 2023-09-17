const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken"); // Import the middleware

// Protect the route with the verifyToken middleware
router.get("/blog", verifyToken, (req, res) => {
  // Handle the protected route logic here
  res.render("blog");
});

module.exports = router;
