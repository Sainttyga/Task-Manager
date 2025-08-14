import { useEffect, useState } from "react"; // react hooks, useEffect for side effects, useState for state management 
import API from "../services/api"; // API for server communication
import TaskCard from "../components/TaskCard"; // TaskCard for displaying tasks
import TaskDialog from "../components/TaskDialog"; // TaskDialog for creating new tasks 
import Navbar from "../components/Navbar"; // Navbar for navigation
import { toast } from "sonner"; // toast for displaying notifications

export default function DeveloperDashboard() { // Developer Dashboard component
    const [tasks, setTasks] = useState([]); // State for tasks, initialized to an empty array

    const load = async () => { // Function to load tasks from the server
        const res = await API.get("/tasks/me"); // Get tasks for the current user
        setTasks(res.data); // Set tasks state with the loaded tasks
    };

    useEffect(() => { load(); }, []); // Load tasks on component mount

    const createTask = async (payload) => { // Function to create a new task
        const res = await API.post("/tasks", payload); // Send a POST request to create a new task, including title and description
        setTasks(prev => [res.data, ...prev]); // Update tasks state with the new task
        toast("Task created ✔️"); // Show success toast
    };

    const toggleTask = async (id) => { // Function to toggle task completion
        const task = tasks.find(t => t._id === id); // Find the task to toggle, based on the provided ID
        const res = await API.put(`/tasks/${id}`, { completed: !task.completed }); // Send a PUT request to update the task, based on the new completion status
        setTasks(prev => prev.map(t => (t._id === id ? res.data : t))); // Update tasks state with the modified task
    };

    const deleteTask = async (id) => { // Function to delete a task
        await API.delete(`/tasks/${id}`); // Send a DELETE request to remove the task
        setTasks(prev => prev.filter(t => t._id !== id)); // Update tasks state by removing the deleted task, based on the ID
        toast("Task deleted 🗑️"); // Show deleted toast
    };

    // Render the developer dashboard with a navbar, task creation dialog, and task cards
    // The dashboard displays a list of tasks with options to create, toggle completion, and delete
    return ( // Render the developer dashboard
        <>
            <Navbar />
            <main className="max-w-5xl mx-auto p-4">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Developer Dashboard</h1>
                        <p className="text-gray-600 dark:text-gray-300">Manage your personal tasks</p>
                    </div>
                    <TaskDialog onSubmit={createTask} />
                </div>

                <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h2 className="font-semibold text-green-900 dark:text-green-100">Developer View</h2>
                    <p className="text-sm text-green-700 dark:text-green-300">
                        You can create, edit, and delete your own tasks. Total tasks: {tasks.length}
                    </p>
                </div>

                <section
                    className="grid gap-6
                     sm:grid-cols-2
                     lg:grid-cols-3
                     xl:grid-cols-4"
                >
                    {tasks.map(t => (
                        <TaskCard
                            key={t._id}
                            task={t}
                            onToggle={toggleTask}
                            onDelete={deleteTask}
                        />
                    ))}
                </section>
            </main>
        </>
    );
}