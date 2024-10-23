import { useEffect } from 'react';

import TaskItem from './TaskItem';

import axios from 'axios';
import { TaskNode } from '../../utilities/TaskList';

const TasksList = ({inputting, taskItems, searchItems, setTaskItems, newTask, currFolderId}) => {
    useEffect(() => {
        const getTasks = async () => {
			try {
				const response = await axios.get(`http://localhost:8000/task/getAll/${currFolderId}`);
				const taskItems = response.data.map((task) => new TaskNode(task.task_id, task.description, task.due_date, task.priority, task.folder_id));
				setTaskItems(taskItems);
			} catch (err) {
				console.error(err.message);
			}
        };
        getTasks();
    }, [currFolderId]);

	useEffect(() => {
		if (newTask) {
			const newTaskItem = {
				task_id: newTask.task_id,
				description: newTask.description,
				due_date: newTask.due_date,
				priority: newTask.priority,
				folder_id: newTask.folder_id,
			}; 
			setTaskItems([...taskItems, newTaskItem]);
		}
	}, [newTask]);

	const mapTasks = (items) => items.map((task) => <TaskItem key={task.task_id} due_date={new Date(task.due_date)} taskId={task.task_id} newTask={newTask} description={task.description} priority={task.priority} setTaskItems={setTaskItems} currFolderId={currFolderId} />);
	
	return (
		<div className="h-full flex flex-col justify-start gap-0.5 py-0.5 bg-blue-100 overflow-y-auto tasks" >
			<div className="grid grid-cols-12 py-2 gap-y-0.5 text-gray-700 text-opacity-90 text-[15px]" >
				<p className="pb-2 col-span-1 text-center" >Priority</p> 
				<p className="pb-2 col-span-6" >Name</p>
				<p className="pb-2 col-span-2 text-center" >Deadline</p>
				<p className="pb-2 col-span-2 text-center" >Active Time</p>
				<span className="pb-2 col-span-1" ></span>
				{inputting ? mapTasks(searchItems) : mapTasks(taskItems)}
			</div>
		</div>
  	);
};

export default TasksList;