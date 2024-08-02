import { useState, useEffect } from 'react';

import TaskItem from './TaskItem';

import axios from 'axios';

const TasksList = ({taskItems, setTaskItems, newTask, currFolder}) => {
	const [buttonClicked, setButtonClicked] = useState(false);

    useEffect(() => {
        const getTasks = async () => {
			try {
				const response = await axios.get(`http://localhost:8000/task/getAll/${currFolder}`);
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
		<ul className="flex flex-col justify-start gap-4 h-full rounded-md bg-blue-300 shadow-md overflow-y-auto p-4 tasks" >
			{taskItems}
		</ul>
  	);
};

export default TasksList;