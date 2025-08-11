const express = require("express"); // Import express framework
const { createTask, getTasks, getAllTasks} = require("../controllers/taskController"); // Import task controller functions
const { protect, authorize } = require("../middleware/auth"); // Import authentication middleware functions

const router = express.Router(); // Create a router instance

router.post("/", protect, createTask); // Define a route for creating a task, which calls the createTask function from taskController
router.get("/:id", protect, getTasks); // Define a route for retrieving a task by ID, which calls the getTask function from taskController
router.get("/all", protect, authorize(["admin"]), getAllTasks); // Define a route for retrieving all tasks, which calls the getAllTasks function from taskController

module.exports = router; // Export the router for use in other parts of the application
