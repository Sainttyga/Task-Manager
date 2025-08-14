const Task = require("../models/Task"); // Import Task model
const User = require("../models/User"); // Import User model

// POST /api/tasks - Create a new task
exports.createTask = async (req, res) => {

  const task = await Task.create({ ...req.body, owner: req.user.i }); // Create a new task with the request body and authenticated user ID
  res.json(task); // Send a JSON response with the created task
};

// GET /api/tasks - Get all tasks for the authenticated user
exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ owner: req.user.id }); // Find all tasks for the authenticated user, using the authenticated user ID as the owner
  res.json(tasks); // Send a JSON response with the tasks
};

// GET /api/tasks/all - Get all tasks for admin or developer
exports.getAllTasks = async (req, res) => {
  const tasks = await Task.find().populate("owner", "email"); // Find all tasks and populate the owner field with user information
  res.json(tasks); // Send a JSON response with the tasks
};



