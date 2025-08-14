import {
    Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription,
    DialogFooter, DialogClose
} from "@/components/ui/dialog"; // Import dialog components
import { Input } from "@/components/ui/input"; // Import the Input component for text input
import { Textarea } from "@/components/ui/textarea"; // Import the Textarea component for multi-line input
import { Button } from "@/components/ui/button"; // Import the Button component for actions
import { useState } from "react"; // Import useState hook for managing form inputs


export default function TaskDialog({ onSubmit }) { // Define the TaskDialog component
    const [title, setTitle] = useState(""); // State for task title, initialized to an empty string
    const [description, setDescription] = useState(""); // State for task description, initialized to an empty string

    const handleCreate = () => { // Function to handle task creation
        onSubmit({ title, description }); // Call the onSubmit prop with the new task data, including title and description
        setTitle(""); // Reset title state, to clear the input field
        setDescription(""); // Reset description state
    };

    return ( // Render the dialog for creating a new task
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Task</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Task</DialogTitle>
                    <DialogDescription>
                        Create a new task by providing a title and description.
                    </DialogDescription>
                </DialogHeader>

                <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                <Textarea
                    placeholder="Description"
                    className="mt-2"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />

                <DialogFooter className="mt-4">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleCreate}>Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}