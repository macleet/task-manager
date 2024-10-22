import axios from 'axios';

const TaskAddField = ({currFolderId, setNewTask}) => {
    const handleEnter = event => {
        if (event.key !== 'Enter' || event.target.value === '') {
            return;
        }

        const postTask = async name => {
            try {
                const response = await axios.post('http://localhost:8000/task/add', {
                    "description": name,
                    "date": null,
                    "priority": false,
                    "folder_id": currFolderId
                });
                setNewTask(response.data[0]);
            } catch (err) {
                console.error(err.message);
            }
        };

        postTask(event.target.value);
        event.target.value = '';
    }

    return (
        <div className="bg-blue-50 p-3" >
            <input 
                onKeyDown={handleEnter} 
                placeholder="Press Enter↵ to add a task..." 
                size="small" 
                className="w-full h-fit self-center p-1 px-2 border-2 border-gray-400 focus:border-gray-700 transition-colors outline-none bg-[#f5f5f5] rounded-md"
                autoComplete='off'
            />
        </div>
    );
};

export default TaskAddField;