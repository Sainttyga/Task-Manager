const jwt = require("jsonwebtoken"); // Import jwt for token verification

// proect our routes with authentication middleware

// MIDDLEWARE: check token and verify user and sets req.user with user info
exports.protect = async (req, res, next) => {
    const auth = req.headers.authorization; // Get the authorization header from request headers
    if (!auth || !auth.startsWith("Bearer ")) { // Check if authorization header exists, 

        return res.status(401).json({ message: "No Token Given" }); // If not, return unauthorized response, with message "No Token Given"
    }
    const token = auth.split(" ")[1]; // Split the authorization header by space and get the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using JWT secret from environment variables
        req.user = decoded; // Attach the decoded user information to the request object
        next(); // Call the next middleware function, allowing the request to proceed
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token" }); // If token verification fails, return unauthorized response with message "Invalid Token"
    }
};

//  MIDDLEWARE: check if user is admin or developer
exports.authorize = (...roles) => { // Middleware to check if user has the required role(s)
    return (req, res, next) => { // Return a function that takes request, response, and next as parameters
        if (!roles.includes(req.user.role)) { // Check if the user's role is included in the allowed roles
            return res.status(403).json({ message: "Access Denied" }); // If not, return forbidden response with message "Access Denied"
        }
        next(); // If user has the required role, call the next middleware function
    };
};




