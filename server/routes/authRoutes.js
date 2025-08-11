const express = require("express"); // Import express framework
const { signup, login } = require("../controllers/authController"); // Import authentication controller functions
const router = express.Router(); // Create a new router instance

router.post("/signup", signup); // Define a route for user signup, which calls the signup function from authController
router.post("/login", login); // Define a route for user login, which calls the login function from authController

module.exports = router; // Export the router for use in other parts of the application