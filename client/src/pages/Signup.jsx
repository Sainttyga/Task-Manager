import { useState } from "react"; // Import useState hook for state management
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import { Input } from "@/components/ui/input"; // Import Input component from UI components
import { Button } from "@/components/ui/button"; // Import Button component from UI components
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Import Card component from UI components
import API from "../services/api"; // Import API from services
import { Link } from "react-router-dom" // Import Link component from react-router-dom for navigation


export default function Signup() {
    // Signup component,
    const [username, setUsername] = useState(""); // State for username input, initialized to an empty string
    const [email, setEmail] = useState(""); // State for email input, initialized to an empty string
    const [password, setPassword] = useState(""); // State for password input, initialized to an empty string
    const [loading, setLoading] = useState(false); // State for loading indicator, initialized to false
    const navigate = useNavigate(); // useNavigate hook for programmatic navigation
    

    const handleSignup = async () => { // handleSignup function, async function for handling signup

        if (!username || !email || !password) return alert("All fields required"); // Check for empty fields
        setLoading(true); // Set loading state to true while processing signup
        try {
            const res = await API.post("/auth/signup", { username, email, password }); // Send signup request to API
            
            localStorage.setItem("token", res.data.token); // Store token in localStorage
            navigate("/dashboard"); // Navigate to dashboard on successful signup
        } catch (err) { // Catch any errors during signup
            alert(err.response?.data?.message || "Signup failed"); // Show error message, 
        } finally { // Always executed
            setLoading(false); // Reset loading state
        }
    };

    return ( // Signup form JSX
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
            <Card className="w-full max-w-md shadow-xl animate-fade">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">
                        Sign Up
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSignup} disabled={loading} className="w-full">
                        {loading ? "Signing up..." : "Sign Up"}
                    </Button>
                </CardFooter>
                <p className="text-sm text-center text-zinc-600 dark:text-zinc-300 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </Card>
        </div>
    );
}