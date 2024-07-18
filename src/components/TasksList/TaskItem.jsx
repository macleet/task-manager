import TaskButtons from "./TaskButtons";

import { useState, useEffect, useRef } from 'react';

import Calendar from "react-calendar";

import { Collapse } from '@mui/material';

import axios from 'axios';


const TaskItem = ({taskId, newTask, description, priority, setButtonClicked, setTaskItems}) => {
	const editInactive = 'hover:text-orange-400 transition-colors';

	const [showCal, setShowCal] = useState(false);
	const [dueDate, setDueDate] = useState(null);
	const [readOnly, setReadOnly] = useState(true);
	const [editBtnColor, setEditBtnColor] = useState(editInactive);

	const [taskStarred, setTaskStarred] = useState(priority);

	const tasksEndRef = useRef(null);

	const taskName = useRef(null);

	useEffect(() => {
		if (newTask) {
			tasksEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [newTask]);

	useEffect(() => {
		const getDueDate = async () => {
			try {
				const response = await axios.get(`http://localhost:8000/task/dueDate/${taskId}`);

				const dueDate = response.data[0].due_date ? new Date(response.data[0].due_date) : null;
				if (dueDate) {
					setDueDate(dueDate);
				}
			} catch (err) {
				console.error(err.message);
			}
		};
		getDueDate();
	}, [dueDate]);

	const handleDayClick = (value, event) => {
		setDueDate(value);
		setShowCal(false);

		const putDueDate = async dueDate => {
			try {
				await axios.put(`http://localhost:8000/task/dateChange/${taskId}`, {	
					"new_date": dueDate
				});
			} catch (err) {
				console.error(err.message);
			}
		};
		putDueDate(value);
	};
	
	const handleEditEnter = event => {
		if (event.key !== 'Enter' || !event.target.value) {
			return;
		}

		const updateTaskName = async newName => {
			try {
				await axios.put(`http://localhost:8000/task/update/${taskId}`, {
					"new_description": newName
				});
			} catch (err) {
				console.error(err.message);
			}
		};

		setReadOnly(true);
		setEditBtnColor(editInactive);
		updateTaskName(event.target.value);
	};

	const dueDateEl = dueDate ? 
						<div className='w-fit rounded-xl bg-blue-800 flex justify-center items-center p-2 opacity-90' >
							<p className='text-xs'>{dueDate.getMonth()+1 + '/' + dueDate.getDate() + '/' + dueDate.getFullYear()}</p>
					  	</div> :
						null
	return (
		<div className='flex flex-col items-center my-4'>
			<li ref={tasksEndRef} className="text-gray-200 font-bold rounded bg-sky-600 w-full h-14 md:h-16 mb-4 flex justify-between items-center pl-2 shadow-md" >
				<input onKeyDown={handleEditEnter} ref={taskName} readOnly={readOnly} defaultValue={description} className="text-xl w-3/6 h-3/4 p-2 bg-inherit rounded-md outline-none" />
				{dueDateEl}
				<TaskButtons taskId={taskId} setButtonClicked={setButtonClicked} showCal={showCal} setShowCal={setShowCal} readOnly={readOnly} setReadOnly={setReadOnly} taskName={taskName} editBtnColor={editBtnColor} setEditBtnColor={setEditBtnColor} taskStarred={taskStarred} setTaskStarred={setTaskStarred} setTaskItems={setTaskItems} />
			</li>
			
			<Collapse in={showCal} timeout="auto" mountOnEnter unmountOnExit >
				<div className='flex justify-center bg-blue-200 max-w-1/2 rounded p-4 mb-4'>
					<Calendar onClickDay={handleDayClick} value={dueDate} calendarType='gregory' className="flex flex-col items-center text-center" />
				</div>
			</Collapse>
		</div>
	);
};

export default TaskItem;