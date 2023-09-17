const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env; // Load your JWT secret from environment variables

function verifyToken(req, res, next) {
  const token = req.cookies.jwt; // Assuming you're storing the token in a cookie
  console.log("Token :", token);

  if (!token) {
    // Token not found in cookies, user is not authenticated
    return res.redirect("/login"); // Redirect to the login page or handle unauthorized access as needed
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      // Token verification failed, user is not authenticated
      return res.redirect("/login"); // Redirect to the login page or handle unauthorized access as needed
    }

    // Token is valid, and `decoded` contains the payload
    req.user = decoded.user;
    console.log(req.user); // Attach user data to the request, if needed
    next(); // Continue with the next middleware or route handler
  });
}

module.exports = verifyToken;
