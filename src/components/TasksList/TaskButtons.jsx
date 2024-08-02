import axios from 'axios';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

const TaskButtons = ({taskId, setButtonClicked, showCal, setShowCal, readOnly, setReadOnly, taskName, editBtnColor, setEditBtnColor, taskStarred, setTaskStarred, setTaskItems}) => {
	const editActive = 'text-orange-400';
	const editInactive = 'hover:text-orange-400 transition-colors';

	const handleDelete = () => {
		const deleteTask = async () => {
			try {
				await axios.delete(`http://localhost:8000/task/delete/${taskId}`);
				setButtonClicked(true);
			} catch (err) {
				console.error(err.message);
			}
		};
		deleteTask();
	};

	const handleCal = () => {
		setShowCal(!showCal);
	};

	const handleEdit = event => {
		if (!taskName.current.value) {
			return;
		}

		const updateTaskName = async (newName) => {
			try {
				await axios.put(`http://localhost:8000/task/update/${taskId}`, {
					"new_description": newName,
				});
			} catch (err) {
				console.error(err.message);
			}
		};

		// Handle turning edit mode on
		if (readOnly) {		
			setEditBtnColor(editActive);
			taskName.current.focus();
		} else {
			updateTaskName(taskName.current.value);
			setEditBtnColor(editInactive);
		}
		setReadOnly(!readOnly);
	};

	const handleStar = () => {
		// console.log(setTaskItems);
		const changePriority = async () => {
			try {
				await axios.put(`http://localhost:8000/task/priority/${taskId}`);
				// console.log(response.data);
				// const taskItems = response.data.map(task => <TaskItem key={task.task_id} taskId={task.task_id} description={task.description} />);
				// console.log(setTaskItems);
				// setTaskItems(taskItems);
			} catch (err) {
				console.error(err.message);
			}
		};
		changePriority();
		setButtonClicked(true);
		setTaskStarred(!taskStarred);
	};

	return (
		<div className="text-gray-200 h-full w-2/6 flex justify-evenly items-center">
			<button onClick={handleCal} className="flex flex-col hover:text-slate-700 transition-colors">
				<EditCalendarIcon fontSize='large' />
			</button>
			<button onClick={handleEdit} className={editBtnColor}>
				<EditIcon id="hello" fontSize='large' />
    	    </button>
    	    <button onClick={handleDelete} className="hover:text-red-700 transition-colors">
				<DeleteIcon fontSize='large'/>
    	    </button>
    	    <button onClick={handleStar} className="hover:text-yellow-500 transition-colors">
				{taskStarred ? <StarIcon fontSize='large' className='text-yellow-500' /> : <StarBorderIcon fontSize='large' />}
    	    </button>
    	</div>
	);
};

export default TaskButtons;