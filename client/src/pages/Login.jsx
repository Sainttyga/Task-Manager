import { useState } from "react"; // Import useState hook for managing form inputs
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import { Input } from "@/components/ui/input"; // Import Input component from UI components
import { Button } from "@/components/ui/button"; // Import Button component from UI components
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Import Card components from UI components
import API from "../services/api"; // Import API from services
import { Link } from "react-router-dom" // Import Link component from react-router-dom for navigation

export default function Login() { // Login component
    const [email, setEmail] = useState(""); // State for email input, initialized to an empty string
    const [password, setPassword] = useState(""); // State for password input, initialized to an empty string
    const navigate = useNavigate(); // useNavigate hook for programmatic navigation
    // useNavigate hook for navigation after successful login
    const [loading, setLoading] = useState(false); // State for loading indicator, initialized to false

    const handleLogin = async () => { // Function to handle login
        if (!email || !password) return alert("All fields required"); // Check for empty fields
        setLoading(true); // Set loading state to true while processing login
        try { // Try to log in the user
            const res = await API.post("/auth/login", { email, password }); // Send login request to API 
            localStorage.setItem("token", res.data.token); // Store token in local storage
            navigate("/dashboard"); // Navigate to dashboard after successful login
            if (!res.data?.token) { // Check if token is not present
                alert("Login failed: Not Token"); // Alert user if token is not present
                return; // Stop further execution if token is not present
            }
        } catch (err) { // Catch any errors during login
            alert(err.response?.data?.message || "Login failed"); // Alert user if login fails, alert with error message or generic message
        } finally { // Always executed
            setLoading(false); // Reset loading state
        }
    };

    return ( // Login form UI, including email and password inputs, and a login button
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
            <Card className="w-full max-w-md shadow-xl animate-fade">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">Log In</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button onClick={handleLogin} disabled={loading} className="w-full">
                        {loading ? "Logging in..." : "Log In"}
                    </Button>
                </CardFooter>

                <p className="text-sm text-center text-zinc-600 dark:text-zinc-300 mt-4">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-600 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </Card>
        </div>
    );
}