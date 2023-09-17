function logoutUser(req, res) {
  res.clearCookie("jwt"); // Clear the JWT cookie
  res.redirect("/login"); // Redirect to login page after logout
}

module.exports = {
  logoutUser,
};
