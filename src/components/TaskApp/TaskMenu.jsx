import { useState, useEffect, useRef } from 'react';
import axios from "axios";

const TaskMenu = ({taskId, editTaskId, setEditTaskId, hover, setDeleted, containerBottom}) => {
    const menuContainerRef = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
        // console.log(taskId, menuContainerRef.current?.getBoundingClientRect().bottom > containerBottom);
        // setIsOverflowing(menuContainerRef.current?.getBoundingClientRect().bottom > containerBottom);
    }, []);

    useEffect(() => {
        if (!hover && !isOverflowing) return;
        setIsOverflowing(menuContainerRef.current?.getBoundingClientRect().bottom > containerBottom);
    }, [hover, containerBottom])

    const handleSubtaskClick = () => {
        try {
            // axios.get
        } catch (error) {
            console.error(`Error deleting task ${taskId}`, error);
        } 
    };
    
    // Toggle the edit mode for the current task
    const handleEditClick = () => setEditTaskId(editTaskId === taskId ? -editTaskId : taskId);
    
    const handleDeleteClick = async () => {
        try {
            await axios.delete("http://localhost:8000/task/delete", {
                data: { id: taskId }
            });
            setDeleted(prev => !prev);
        } catch(error) {
            console.error(`Error deleting task ${taskId}`, error);
        }
    };

    return (
        <div
            ref={menuContainerRef} 
            className={`${hover ? "opacity-100" : "opacity-0 invisible scale-0"} ${isOverflowing ? "bottom-[25px]" : "top-[25px]" } flex flex-col gap-y-0.5 transition-opacity ease-in-out font-semibold text-slate-700 absolute right-[10px] bg-blue-200 z-50 rounded rounded-tr-none shadow`}
        >
            <button
                onClick={handleSubtaskClick}
                className="flex items-center justify-start text-left p-2 px-3 w-full hover:bg-blue-300 leading-tight rounded-tl transition-colors ease-in-out"
            >
                Generate subtasks
            </button>
            <button 
                onClick={handleEditClick} 
                className="flex items-center justify-start text-left p-2 px-3 w-full hover:bg-blue-300 h-8 transition-colors ease-in-out"
            >
                Edit
            </button>
            <button
                onClick={handleDeleteClick}
                className="flex items-center justify-start text-left p-2 px-3 w-full hover:bg-red-300 h-8 rounded-b transition-colors ease-in-out"
            >
                Delete
            </button>
        </div>
    );
};

export default TaskMenu;
