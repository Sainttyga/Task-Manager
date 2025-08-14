import { MoonIcon, SunIcon } from "@heroicons/react/24/solid"; // Import the MoonIcon and SunIcon components from the heroicons library
import { Button } from "@/components/ui/button"; // Import the Button component from the components directory
import { useState, useEffect } from 'react'; // Import the useState and useEffect hooks from the React library

export default function ThemeToggle() { // Define a functional component called ThemeToggle
    const [isDarkMode, setIsDarkMode] = useState(
        // Define a state variable called isDarkMode and initialize it to false
        () => localStorage.getItem("theme") === "dark" // Get the value of the "theme" key from local storage and set isDarkMode to true if it exists
    );

    useEffect(() => { // Use the useEffect hook to run a side effect
        const root = window.document.documentElement; // Get the root element of the document

        if (isDarkMode) { // If isDarkMode is true
            root.classList.add("dark"); // Add the "dark" class to the root element
            localStorage.setItem("theme", "dark"); // Set the "theme" key in local storage to "dark"
        } else { // If isDarkMode is false
            root.classList.remove("dark"); // Remove the "dark" class from the root element
            localStorage.setItem("theme", "light"); // Set the "theme" key in local storage to "light"
        }
    }, [isDarkMode]); // Run the side effect whenever isDarkMode changes

    return ( // Return the JSX for the ThemeToggle component
        <Button variant="ghost" size="icon" aria-label="toggle theme" onClick={() => setIsDarkMode(!isDarkMode)}> 
            {isDarkMode ? (
                <SunIcon className="h-5 w-5" />
            ) : (
                <MoonIcon className="h-5 w-5" />
            )}
        </Button>
    ); 
};