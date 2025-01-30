import { 
	useEffect,
	useState,
} from 'react';

import TaskItem from './TaskItem.jsx';
import TaskAddField from './TaskAddField.jsx';

import axios from 'axios';

const TasksList = ({showFolder, searching, taskItems, searchItems, setTaskItems, currFolderId}) => {
	// State to store the new task details
	const [newTask, setNewTask] = useState({
		name: "",
		dueDate: null,
		priority: 0,
		folderId: -1,
		notes: "",
		activeSeconds: 0,
		tags: [],
	});

	// State to store the ID of the task being edited
	const [editTaskId, setEditTaskId] = useState(-1);

	// State to check if task deleted
	const [taskDeleted, setTaskDeleted] = useState(false);

	// Fetch all tasks for the current folder when folder ID, new task, or edited task changes
	useEffect(() => {
        const getAllTasks = async () => {
			try {
				// Fetch tasks from the API
				const response = await axios.get(`http://localhost:8000/task/getAll/${currFolderId}`);
				
				// Map response data to the required format
				const taskItems = response.data.map((task) => ({
					taskId: task.task_id,
					name: task.name,
					dueDate: task.due_date,
					priority: task.priority,
					folderId: task.folder_id,
					notes: task.notes,
					activeSeconds: task.active_seconds,
					tags: task.tags,
				}));

				// Update the state with fetched tasks
				setTaskItems(taskItems);
			} catch (err) {
				console.error("Error fetching tasks:", err.message);
			}
        };
        getAllTasks();
    }, [currFolderId, newTask, editTaskId, taskDeleted]);

	// Add the new task to the task list when `newTask` changes
	useEffect(() => {
		if (newTask) {
			// Prepare the new task object in the required format
			const newTaskItem = {
				task_id: newTask.taskId,
				name: newTask.name,
				due_date: newTask.dueDate,
				priority: newTask.priority,
				folder_id: newTask.folderId,
				notes: newTask.notes,
				active_seconds: newTask.activeSeconds,
				tags: newTask.tags,
			};

			// Add the new task to the list
			setTaskItems([...taskItems, newTaskItem]);
		}
	}, [newTask]); // Dependency ensures the effect runs when `newTask` updates

	// Map tasks to TaskItem components
	const mapTasks = (items) => 
		items.map((task) => 
			<TaskItem 
				key={task.taskId} 
				taskId={task.taskId} 
				name={task.name} 
				dueDate={task.dueDate} 
				priority={task.priority} 
				notes={task.notes}
				activeSeconds={task.activeSeconds}
				tags={task.tags}
				setTaskItems={setTaskItems} 
				editTaskId={editTaskId} 
				setEditTaskId={setEditTaskId}
				currFolderId={currFolderId}
				newTask={newTask} 
				setTaskDeleted={setTaskDeleted}
				parentBottom={bottom}
			/>
		);

	return (
		<>
			{/* Container for the task list */}
			<div className={`flex flex-col relative z-10 shadow justify-start bg-blue-100 transition-all ${showFolder ? "w-4/5" : "w-full"}`} >
				{/* Header row for task list */}
				<div className="scroll grid grid-cols-12 py-3 gap-y-0.5 text-gray-700 text-opacity-90 text-[15px]" >
					<p className="col-span-1 text-center text-[14px]" >Priority</p> 
					<p className="col-span-6 text-[14px]" >Name</p>
					<p className="col-span-2 text-center text-[14px]" >Deadline</p>
					<p className="col-span-2 text-center text-[14px]" >Active Time</p>
					<span className="col-span-1" ></span> {/* Spacer for action buttons */}
				</div>

				{/* Scrollable task list container */}
				<div className="h-full scroll overflow-y-auto overflow-x-hidden" >
					{searching ? mapTasks(searchItems) : mapTasks(taskItems)}
				</div>

				{/* Field to add new tasks */}
				<TaskAddField currFolderId={currFolderId} setNewTask={setNewTask} />
			</div>
		</>
  	);
};

export default TasksList;
