const mongoose = require("mongoose"); // Import mongoose for MongoDB connection

// file responsible for connection to mongo db
const taskSchema = new mongoose.Schema({
  // Define the schema for Task model
  title: { type: String, required: true }, // Define title field with required validation
  description: { type: String, required: true }, // Define description field with required validation
  completed: { type: Boolean, default: false }, // Define completed field with default value
  // status: { type: String, enum: ["pending", "completed"], default: "pending" }, // Define status field with enum validation and default value
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Define userId field with reference to User model and required validation
});
module.exports = mongoose.model("Task", taskSchema); // Export the Task model based on the defined schema