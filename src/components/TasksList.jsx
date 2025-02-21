import { 
	useEffect,
	useLayoutEffect,
	useState,
	useRef
} from 'react';

import TaskItem from './TaskItem/TaskItem.jsx';
import TaskAddField from './TaskAddField.jsx';
import axios from 'axios';
import { DurationProvider } from '../context/DurationContext.jsx';

const TasksList = ({showFolder, searching, taskItems, searchItems, setTaskItems, currFolderId}) => {
	// Task list container ref
	const containerRef = useRef(null);

	// State to store container bottom
	const [bottom, setBottom] = useState(-1);

	useLayoutEffect(() => {
		setBottom(containerRef.current?.getBoundingClientRect().bottom);
		const handleResize = () => setBottom(containerRef.current?.getBoundingClientRect().bottom);
		window.addEventListener("resize", handleResize);

		// Clean up
		return () => {
			window.removeEventListener("resize", handleResize);
		}
	}, []);
	
	// State to store the new task details
	const [newTask, setNewTask] = useState({
		name: "",
		dueDate: null,
		priority: 0,
		folderId: -1,
		notes: "",
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
				const response = await axios.get(`https://task-manager-server-6eht.onrender.com/task/getAll/${currFolderId}`);
				
				// Map response data to the required format
				const taskItems = response.data.map((task) => ({
					taskId: task.task_id,
					name: task.name,
					dueDate: task.due_date ? (new Date(task.due_date)).toLocaleDateString("en-US") : null,
					priority: task.priority,
					folderId: task.folder_id,
					notes: task.notes,
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
				// due_date: newTask.dueDate ? (new Date(dueDate)).toLocaleDateString("en-US") : null,
				priority: newTask.priority,
				folder_id: newTask.folderId,
				notes: newTask.notes,
				tags: newTask.tags,
			};

			// Add the new task to the list
			setTaskItems([...taskItems, newTaskItem]);
		}
	}, [newTask]); // Dependency ensures the effect runs when `newTask` updates

	// Map tasks to TaskItem components
	const mapTasks = (items) => 
		items.map((task) => 
			task.taskId && <DurationProvider key={task.taskId} >
				<TaskItem 
					taskId={task.taskId} 
					name={task.name} 
					dueDate={task.dueDate} 
					priority={task.priority} 
					notes={task.notes}
					tags={task.tags}
					editTaskId={editTaskId} 
					setEditTaskId={setEditTaskId}
					newTask={newTask} 
					setTaskDeleted={setTaskDeleted}
					parentBottom={bottom}
				/>
			</DurationProvider>
		);

	return (
		<div className={`flex flex-col relative shadow justify-start bg-blue-100 transition-all ${showFolder ? "w-4/5" : "w-full"}`} >
			{/* Header row for task list */}
			<div className="scroll grid grid-cols-[repeat(13,_minmax(0,_1fr))] py-3 gap-y-0.5 text-gray-700 text-opacity-90 text-[15px]" >
				<p className="col-span-1 text-center text-[14px]" >Hub</p> 
				<p className="col-span-1 text-center text-[14px]" >Priority</p> 
				<p className="col-span-6 text-[14px]" 			  >Name</p>
				<p className="col-span-2 text-center text-[14px]" >Deadline</p>
				<p className="col-span-2 text-center text-[14px]" >Active Time</p>
				<p className="col-span-1 text-center text-[14px]" >Actions</p>
			</div>

			{/* Scrollable task list container */}
			<div ref={containerRef} className="h-full scroll overflow-y-auto overflow-x-hidden" >
				{searching ? mapTasks(searchItems) : mapTasks(taskItems)}
			</div>

			<TaskAddField currFolderId={currFolderId} setNewTask={setNewTask} />
		</div>
  	);
};

export default TasksList;
