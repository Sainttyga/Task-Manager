import { Link } from "react-router-dom"; // Import the Link component from react-router-dom for navigation
import ThemeToggle from "./ThemeToggle"; // Import the ThemeToggle component for toggling dark mode
import { Button } from "@/components/ui/button"; // Import the Button component from the components directory
import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"; // Import dropdown menu components
import { UserCircleIcon } from "@heroicons/react/24/solid"; // Import the UserCircleIcon component from Heroicons
import { getUserRole, getUserFromToken } from "../utils/auth"; // Import functions to get user role and user from token

export default function Navbar() { // Define the Navbar component
    const userRole = getUserRole(); // Get user role
    const user = getUserFromToken(); // Get user from token

    const logout = () => { // Define the logout function
        localStorage.removeItem("token"); // Remove the token from local storage
        window.location.href = "/login"; // Redirect to login page
    };

    return ( // Start of the Navbar component
        <nav className="glass sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-700 px-4 py-2 flex items-center justify-between">
            <Link to="/dashboard" className="font-bold text-lg">Dev Task Manager</Link>

            <div className="flex items-center gap-2">
                {userRole && (
                    <span className={`px-2 py-1 rounded text-xs font-medium ${userRole === 'admin'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                        {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                    </span>
                )}
                <ThemeToggle />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <UserCircleIcon className="h-6 w-6" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                        {user && (
                            <>
                                <div className="px-2 py-1.5 text-sm text-gray-600 dark:text-gray-300 border-b">
                                    @{user.username}
                                </div>
                            </>
                        )}
                        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
};