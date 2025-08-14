const Task = require("../models/Task"); // Import Task model

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

// PUT /api/tasks/:id - Update a task by ID
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id); // Find task by ID

    if (!task) {
      return res.status(404).json({ message: "Task not found" }); // Task not found
    }

    // Check if user owns the task or is admin
    if (task.owner.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to update this task" }); // Not authorized
    }

    const updatedTask = await Task.findByIdAndUpdate( // Find task by ID
      req.params.id, // Task ID
      req.body, // Updated task data
      { new: true, runValidators: true } // Options for updating
    );

    res.json(updatedTask); // Send updated task as response
  } catch (error) { // Catch any errors
    res.status(400).json({ message: error.message }); // Send error message as response
  }
};

// DELETE /api/tasks/:id - Delete a task by ID
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id); // Find task by ID

    if (!task) {
      return res.status(404).json({ message: "Task not found" }); // Task not found
    }

    // Check if user owns the task or is admin
    if (task.owner.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this task" }); // Not authorized
    }

    await Task.findByIdAndDelete(req.params.id); // Delete task by ID
    res.json({ message: "Task deleted successfully" }); // Send success message as response
  } catch (error) { // Catch any errors
    res.status(400).json({ message: error.message }); // Send error message as response
  }
};