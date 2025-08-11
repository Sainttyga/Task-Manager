// file responsible for connection to mongo db
const mongoose = require('mongoose'); // Import mongoose for MongoDB connection

// connect to MongoDB using the URI from environment variables (mongoose)
const connectDB = async () => {
    try {
        // connect to MongoDB using the URI from environment variables
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected successfully"); // log success message
    } catch (error) {

        // handle any errors during connection, 
        console.error('MongoDB connection error:', error.message); // log error message
        process.exit(1); // exit the process with failure
    };
};

module.exports = connectDB; // export the connectDB function for use in other files, for calling the connection