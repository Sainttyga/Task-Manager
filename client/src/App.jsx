import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Import necessary components from react-router-dom for routing
import Login from "./pages/Login"; // Import the Login component from the pages folder
import Signup from "./pages/Signup"; // Import the Signup component from the pages folder
import RoleDashboard from "./pages/RoleDashboard"; // Import the RoleDashboard component from the pages folder
import ProtectedRoute from "./utils/ProtectedRoute"; // Import the ProtectedRoute component for protecting routes
import { Toaster } from "sonner"; // Import the Toaster component from sonner for displaying notifications

export default function App() { // Define the App component
  return (
    <BrowserRouter>

    <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <RoleDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}