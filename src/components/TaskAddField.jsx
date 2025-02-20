import axios from 'axios';

const TaskAddField = ({ currFolderId, setNewTask }) => {
    // Handle the Enter key press to add a new task
    const handleEnter = (event) => {
        // Only trigger if the key pressed is 'Enter' and the input is not empty
        if (event.key !== 'Enter' || event.target.value === '') return;
        
        // Function to post the new task to the backend
        const postTask = async (name) => {
            try {
                // Send a POST request to add the task
                await axios.post('https://task-manager-server-6eht.onrender.com/task/add', {
                    name: name,
                    folderId: currFolderId, // Associate task with the current folder
                });
                // Update the state to add the new task locally
                setNewTask((prev) => ({ ...prev, name: name, folderId: currFolderId }));
            } catch (err) {
                console.error("Error adding new task", err.message);
            }
        };

        // Call the postTask function with the value entered in the input field
        postTask(event.target.value);
        // Clear the input field after submitting the task
        event.target.value = "";
    }

    return (
        <div className="flex bg-blue-50 p-3">
            {/* Input field for adding a task */}
            <input 
                onKeyDown={handleEnter} // Trigger handleEnter on key press
                placeholder="Press Enter↵ to add a task..." 
                size="small" 
                className="w-full h-fit self-center p-1 px-2 border-2 border-gray-400 focus:border-gray-700 transition-colors outline-none bg-[#f5f5f5] rounded-md"
                autoComplete='off' // Prevent the browser's autocomplete from showing
            />
        </div>
    );
};

export default TaskAddField;
