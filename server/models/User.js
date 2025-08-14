const mongoose = require('mongoose') // Import mongoose for MongoDB connection

// file responsible for connection to mongo db
const userSchema = new mongoose.Schema({ // Define the schema for User model
    username: { type: String, required: true, unique: true }, // Define username field with required and unique validation
    email: { type: String, required: true, unique: true }, // Define email field with required and unique validation
    password: { type: String, required: true }, // Define password field with required validation
    role: { type: String, enum: ["developer", "admin"], default: "developer" } // Define role field with enum validation and default value
});

module.exports = mongoose.model('User', userSchema); // Export the User model based on the defined schema