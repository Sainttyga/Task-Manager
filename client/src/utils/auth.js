// Utility functions for authentication and role management

export const decodeToken = (token) => { // Decode JWT token
    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode the payload, extracting user information
        return payload; // Return the decoded payload
    } catch (error) {
        // Catch any errors that occur during decoding
        console.error("Error decoding token:", error); // Log the error
        return null; // Return null if decoding fails
    }
};

export const getUserFromToken = () => { // Get user information from JWT token
    const token = localStorage.getItem('token'); // Get the token from local storage
    if (!token) return null; // Return null if no token is found

    return decodeToken(token); // Decode the token and return the user information
};

export const getUserRole = () => { // Get user role from JWT token
    const user = getUserFromToken(); // Get user information from token
    return user?.role || null; // Return the user's role or null if not found
};

export const isAdmin = () => { // Check if user is admin
    return getUserRole() === 'admin'; // Return true if user is admin
};

export const isDeveloper = () => { // Check if user is developer
    return getUserRole() === 'developer'; // Return true if user is developer
};

export const getUsername = () => { // Get username from JWT token
    const user = getUserFromToken(); // Get user information from token
    return user?.username || null; // Return the username or null if not found
};