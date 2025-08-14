import { getUserRole } from "../utils/auth"; // Import utility function to get user role
import AdminDashboard from "./AdminDashboard"; // Import the AdminDashboard component
import DeveloperDashboard from "./Dashboard"; // Import the DeveloperDashboard component
import { Navigate } from "react-router-dom"; // Import the Navigate component from react-router-dom

export default function RoleDashboard() { // Define the RoleDashboard component
    const userRole = getUserRole(); // Get the user role from the token

    // If no role is found, redirect to login
    if (!userRole) {
        return <Navigate to="/login" replace />; // Redirect to login if no role is found
    }

    // Render appropriate dashboard based on role
    switch (userRole) {
        case 'admin':
            return <AdminDashboard />;
        case 'developer':
            return <DeveloperDashboard />;
        default:
            // If role is not recognized, redirect to login
            return <Navigate to="/login" replace />;
    }
} 