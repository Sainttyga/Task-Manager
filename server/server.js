require("dotenv").config(); // Load environment variables from .env file
const express = require("express"); // Import express framework
const cors = require("cors"); // Import cors middleware
const connectDB = require("./config/database"); // Import database connection function

const app = express(); // Create an express application instance
connectDB(); // Connect to the MongoDB database

app.use(cors()); // Enable CORS middleware
app.use(express.json()); // Parse JSON request bodies

app.use("/api/auth", require("./routes/authRoutes")); // Use authentication routes, which handle user signup and login
app.use("/api/tasks", require("./routes/taskRoutes")); // Use task routes, which handle task creation and retrieval

const PORT = process.env.PORT || 5000; // Define the port for the server to listen on, defaulting to 5000 if not specified in environment variables

app.listen(PORT, () => { // Start the server and log a message when it starts
  console.log(`Server is running on port http://localhost:${PORT}`); // Log the server URL to the console, indicating that the server is running successfully
});
