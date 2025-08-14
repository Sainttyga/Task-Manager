import { useEffect, useState } from "react"; // Import React hooks for state and effect management
import API from "../services/api"; // Import API client
import TaskCard from "../components/TaskCard"; // Import TaskCard component
import TaskDialog from "../components/TaskDialog"; // Import TaskDialog component
import Navbar from "../components/Navbar"; // Import Navbar component
import { toast } from "sonner"; // Import toast for notifications

export default function AdminDashboard() { // Admin Dashboard component
    const [tasks, setTasks] = useState([]); // Task list state
    const [loading, setLoading] = useState(true); // Loading state
    const [taskLoading, setTaskLoading] = useState({}); // { [taskId]: boolean } 

    // Helper for error messages
    const handleError = (defaultMsg, error) => { // Error handling function
        console.error(error); // Log error to console
        toast.error(error?.response?.data?.message || defaultMsg); // Show error notification
    };

    const load = async () => { // Load tasks
        try { 
            const res = await API.get("/tasks/all"); // Fetch all tasks
            setTasks(res.data); // Set tasks state
        } catch (error) { // Catch errors
            handleError("Failed to load tasks", error); // Show error notification
        } finally { // Always executed
            setLoading(false); // Set loading state to false
        }
    };

    useEffect(() => { load(); }, []); // Load tasks on mount

    const createTask = async (payload) => { // Create a new task
        try { // Try to create a new task
            const res = await API.post("/tasks", payload); // Send POST request to create task
            setTasks(prev => [res.data, ...prev]); // Prepend new task to tasks state
            toast.success("Task created ✔️"); // Show success notification
        } catch (error) { // Catch errors
            handleError("Failed to create task", error); // Show error notification
        }
    };

    const toggleTask = async (id) => { // Toggle task completion
        const task = tasks.find(t => t._id === id); // Find the task by ID
        if (!task) return toast.error("Task not found"); // Show error notification

        setTaskLoading(prev => ({ ...prev, [id]: true })); // Set loading state for task
        try { // Try to update task
            const res = await API.put(`/tasks/${id}`, { completed: !task.completed }); // Send PUT request to update task
            setTasks(prev => prev.map(t => (t._id === id ? res.data : t))); // Update task in state
            toast.success("Task updated ✔️"); // Show success notification
        } catch (error) { // Catch errors
            handleError("Failed to update task", error); // Show error notification
        } finally { // Always executed
            setTaskLoading(prev => ({ ...prev, [id]: false })); // Reset loading state for task
        }
    };

    const deleteTask = async (id) => {
        setTaskLoading(prev => ({ ...prev, [id]: true })); // Set loading state for task
        try { // Try to delete task
            await API.delete(`/tasks/${id}`); // Send DELETE request to delete task
            setTasks(prev => prev.filter(t => t._id !== id)); // Remove task from state
            toast.success("Task deleted 🗑️"); // Show success notification
        } catch (error) { // Catch errors
            handleError("Failed to delete task", error); // Show error notification
        } finally { // Always executed
            setTaskLoading(prev => ({ ...prev, [id]: false })); // Reset loading state for task
        }
    };

    if (loading) { // If loading, show loading state
        return (
            <>
                <Navbar />
                <main className="max-w-5xl mx-auto p-4">
                    <div className="flex justify-center items-center h-64">
                        <div className="text-lg">Loading tasks...</div>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="max-w-5xl mx-auto p-4">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                        <p className="text-gray-600 dark:text-gray-300">Manage all tasks across the organization</p>
                    </div>
                    <TaskDialog onSubmit={createTask} />
                </div>

                <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h2 className="font-semibold text-blue-900 dark:text-blue-100">Admin View</h2>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                        You can view, edit, and delete all tasks from all users. Total tasks: {tasks.length}
                    </p>
                </div>

                <section
                    className="grid gap-6
                     sm:grid-cols-2
                     lg:grid-cols-3
                     xl:grid-cols-4"
                >
                    {tasks.map(t => (
                        <div key={t._id} className="relative">
                            <TaskCard
                                task={t}
                                onToggle={toggleTask}
                                onDelete={deleteTask}
                                loading={taskLoading[t._id] || false}
                            />
                            {t.owner && (
                                <div className="absolute top-2 right-2 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs">
                                    @{t.owner.username}
                                </div>
                            )}
                        </div>
                    ))}
                </section>

                {tasks.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">
                            No tasks found. Create the first task to get started!
                        </p>
                    </div>
                )}
            </main>
        </>
    ); // End of AdminDashboard component
}
