import { Navigate } from "react-router-dom"; // Import Navigate component for redirection

export default function ProtectedRoute({ children }) {
  // ProtectedRoute component that checks if the user is authenticated
  const token = localStorage.getItem("token"); // Get the token from local storage
  return token ? children : <Navigate to="/login" replace />; // If no token, redirect to login page preserving the current location
}

