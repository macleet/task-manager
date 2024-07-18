import { useState, useEffect } from 'react';

import TaskItem from './TaskItem';

import axios from 'axios';

const TasksList = ({taskItems, setTaskItems, newTask, currFolder}) => {
	const [buttonClicked, setButtonClicked] = useState(false);

    useEffect(() => {
        const getTasks = async () => {
			try {
				const response = await axios.get(`http://localhost:8000/task/getAll/${currFolder}`);
				// console.log('******');
				const taskItems = response.data.map(task => <TaskItem key={task.task_id} taskId={task.task_id} newTask={newTask} description={task.description} priority={task.priority} setButtonClicked={setButtonClicked} setTaskItems={setTaskItems} />);
				setTaskItems(taskItems);
			} catch (err) {
				console.error(err.message);
			}
        };
        getTasks();
		setButtonClicked(false);
    }, [currFolder, buttonClicked]);

	useEffect(() => {
		if (newTask) {
			const newTaskItem = <TaskItem key={newTask.task_id} taskId={newTask.task_id} newTask={newTask} description={newTask.description} priority={newTask.priority} setButtonClicked={setButtonClicked} setTaskItems={setTaskItems}  />; 
			setTaskItems(taskItems => ([...taskItems, newTaskItem]));
		}
	}, [newTask]);
	
	return (
    	<div className="h-full px-4 lg:px-12 rounded-md bg-blue-300 mb-6 shadow-md overflow-y-auto tasks" >
			<ul>
				{taskItems}
			</ul>
    	</div>
  	);
};

export default TasksList;