import axios from 'axios';

import { TextField } from '@mui/material';

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
		<TextField 
            onKeyDown={handleEnter} 
            placeholder="Press Enter↵ to add task..." 
            size="small" 
            className="w-full h-fit self-center"
			autoComplete='off'
        />
    );
};

export default TaskAddField;