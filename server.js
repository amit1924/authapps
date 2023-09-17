const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser"); // Require cookie-parser

const app = express();

require("dotenv").config(); // Load environment variables

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cookieParser()); // Use cookie-parser

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Set up routes
app.use(require("./routes/index"));
app.use(require("./routes/loginRoutes"));
app.use(require("./routes/registerRoutes"));
app.use(require("./routes/authRoutes"));
app.use(require("./routes/blogRoutes"));

// Set up view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
