import axios from "axios"; // Import axios for making HTTP requests

const API = axios.create({
    baseURL: "http://localhost:5000/api"
}); // Create an axios instance with the base URL

// Add a request interceptor to add a token to the request headers
API.interceptors.request.use((cfg) => {
    const token = localStorage.getItem("token"); // Get the token from local storage
    if (token) {
      // If the token exists
      cfg.headers.Authorization = `Bearer ${(token)}`; // Add the token to the request headers
      // cfg.headers.Authorization = `Bearer ${token}`; // Add the token to the request headers
    }
    return cfg; // Return the configuration object
});

export default API; // Export the axios instance, which can be used in other parts of the application