const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Import jwt for generating JWT tokens
const User = require("../models/User"); // Import the User model from the models folder

// signup function to register a new user endpoint logic to create a new user in the database
exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body; // Destructure username, email and password from request body

        const emailExists = await User.findOne({ email }); // Check if user with the given email already exists in the database
        if (emailExists) return res.status(400).json({ message: "Email already exists" });  // If user exists, return error response

        const usernameExists = await User.findOne({ username });  // Check if user with the given username already exists in the database
        if (usernameExists) return res.status(400).json({ message: "Username already exists" }); // If user exists, return error response

        const hashed = await bcrypt.hash(password, 10); // Hash the password using bcrypt with a salt round of 10
        const user = await User.create({ username, email, password: hashed }); // Create a new user in the database with hashed password

        const token = jwt.sign({ id: user._id, role: user.role, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: '1h' // Set token expiration to 1 hour
        }); // Generate a JWT token with user ID and role
        res.json({ token }); // Send a JSON response with the generated token
    } catch (error) {
        console.error('Signup Error:', error); // Log any errors that occur during signup
        res.status(500).json({ message: "Server error during signup" });  // Send error message as response
    }
};

// login function to authenticate a user endpoint logic to log in an existing user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body; // Destructure email and password from request body

        const user = await User.findOne({ email }); // Check if user with the given email exists in the database
        if (!user) {
            return res.status(404).json({ message: "User Not Found" }); // If user does not exist, return error response
        };

        const match = await bcrypt.compare(password, user.password); // Compare the provided password with the hashed password in the database
        if (!match) {
            return res.status(401).json({ message: "Incorrect password" }); // If passwords do not match, return error response
        };

        const token = jwt.sign({ id: user._id, role: user.role, username: user.username}, process.env.JWT_SECRET,
            { expiresIn: '1h' } // Set token expiration to 1 hour
        ); // Generate a JWT token with user ID and role

        res.json({ token }); // Send a JSON response with the generated token

    } catch (error) {
        console.error('Login Error:', error); // Log any errors that occur during login
        res.status(500).json({ message: "Server error during Login" }); // Send error message as response
    }
};