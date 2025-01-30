import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useEffect, useRef, useState } from 'react';
import EditModal from './EditModal.jsx';
import TaskMenu from './TaskMenu.jsx';

const TaskItem = ({
    taskId,
    newTask,
    name,
    priority,
    notes,
    activeSeconds,
    tags,
    dueDate,
    editTaskId,
    setEditTaskId,
    setTaskDeleted,
    parentBottom,
}) => {
    const tasksEndRef = useRef(null);
	const [hover, setHover] = useState(false);

    // Scroll to the new task if it's added
    useEffect(() => {
        if (newTask.folderId > 0) tasksEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, [newTask]);

	const handleOnMouseEnter = () => setHover(true);
	const handleOnMouseLeave = () => setHover(false);
    const handleSubtaskClick = () => {};

    return (
        <div ref={tasksEndRef} className="grid grid-cols-[repeat(13,_minmax(0,_1fr))] text-opacity-90 border-y-[1.25px] text-[15px]">
            {/* Subtasks toggle */}
            <div className={`h-16 flex justify-center items-center col-span-1 bg-opacity-40 transition-all ${editTaskId === taskId ? "bg-blue-400" : "bg-white"}`}>
                <button 
                    className=" text-opacity-70 text-slate-500 hover:text-slate-700 transition-all ease-in-out duration-400" 
                    onClick={handleSubtaskClick}    
                >
                    <ArrowRightIcon />
                </button>
            </div>

            {/* Priority indicator */}
            <div className={`h-16 flex justify-center items-center col-span-1 bg-opacity-40 transition-all ${editTaskId === taskId ? "bg-blue-400" : "bg-white"}`}>
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            </div>

            {/* Task name */}
            <div className={`h-16 col-span-6 flex items-center bg-opacity-40 transition-all ${editTaskId === taskId ? "bg-blue-400" : "bg-white"}`}>
                <p className="bg-transparent w-full transition-all text-black">{name}</p>
            </div>
            
            {/* Due date */}
            <div className={`relative h-16 col-span-2 flex justify-center items-center text-black bg-opacity-40 transition-all ${editTaskId === taskId ? "bg-blue-400" : "bg-white"}`}>
                {dueDate && <p className="flex justify-center items-center text-center">
					{dueDate.split("T")[0].replaceAll("-", "/")}
				</p>}
            </div>

            {/* Active seconds (displaying 0s for now) */}
            <p className={`h-16 col-span-2 flex justify-center items-center text-black bg-opacity-40 transition-all ${editTaskId === taskId ? "bg-blue-400" : "bg-white"}`}>
				{activeSeconds}s
			</p>

            {/* Task details hover button */}
            <div className={`h-16 col-span-1 flex justify-center items-center bg-opacity-40 transition-all ${editTaskId === taskId ? "bg-blue-400" : "bg-white"}`}>
                <div 
					onMouseEnter={handleOnMouseEnter}
					onMouseLeave={handleOnMouseLeave}
					className={`cursor-pointer relative transition-all hover:text-slate-800 py-1 ${editTaskId === taskId ? "text-slate-900" : "text-slate-500 text-opacity-90"}`}
				>
					<MoreVertIcon />
					<TaskMenu 
						taskId={taskId}
						editTaskId={editTaskId}
						setEditTaskId={setEditTaskId}
						hover={hover}
                        setDeleted={setTaskDeleted}
                        containerBottom={parentBottom}
					/>
                </div>
            </div>

            {/* Task details edit modal window */}
            <EditModal
                taskId={taskId}
                name={name}
                dueDate={dueDate}
                priority={priority}
                notes={notes}
                activeSeconds={activeSeconds}
                tags={tags}
                editTaskId={editTaskId}
                setEditTaskId={setEditTaskId}
            />
        </div>
    );
};

export default TaskItem;
