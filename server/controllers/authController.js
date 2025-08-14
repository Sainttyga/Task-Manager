const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Import jwt for generating JWT tokens
const User = require("../models/User"); // Import the User model from the models folder

// signup function to register a new user endpoint logic to create a new user in the database
exports.signup = async (req, res) => {
    const { email, password } = req.body; // Destructure email and password from request body

    const exits = await User.findOne({ email }); // Check if user with the given email already exists in the database
    if (exits) {
        return res.status(400).json({ message: "User already exists" }); // If user exists, return error response
    };

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password using bcrypt with a salt round of 10
    const user = await User.create({ email, password: hashedPassword }); // Create a new user in the database with hashed password
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET,
        { expiresIn: '1h' } // Set token expiration to 1 hour
    ); // Generate a JWT token with user ID and role

    res.json({ token }); // Send a JSON response with the generated token

};

// login function to authenticate a user endpoint logic to log in an existing user
exports.login = async (req, res) => {
    const { email, password } = req.body; // Destructure email and password from request body

    const user = await User.findOne({ email }); // Check if user with the given email exists in the database
    if (!user) {
        return res.status(404).json({ message: "User Not Found" }); // If user does not exist, return error response
    };

    const isMatch = await bcrypt.compare(password, user.password); // Compare the provided password with the hashed password in the database
    if (!isMatch) {
        return res.status(401).json({ message: "Incorrect password" }); // If passwords do not match, return error response
    };

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET,
        { expiresIn: '1h' } // Set token expiration to 1 hour
    ); // Generate a JWT token with user ID and role

    res.json({ token }); // Send a JSON response with the generated token
};

