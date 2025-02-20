import { useState, useEffect, useRef } from 'react';
import axios from "axios";

const TaskMenu = ({taskId, editTaskId, setEditTaskId, hover, setDeleted, containerBottom}) => {
    const menuContainerRef = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
        if (!hover && !isOverflowing) return;
        setIsOverflowing(menuContainerRef.current?.getBoundingClientRect().bottom > containerBottom);
    }, [hover, containerBottom])
    
    // Toggle the edit mode for the current task
    const handleEditClick = () => setEditTaskId(editTaskId === taskId ? -editTaskId : taskId);
    
    const handleDeleteClick = async () => {
        try {
            await axios.delete("http://localhost:3000/task/delete", {
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
            className={`${hover ? "opacity-100" : "opacity-0 invisible scale-0"} ${isOverflowing ? "bottom-[25px]" : "top-[25px]" } flex flex-col gap-y-0.5 transition-opacity ease-in-out font-semibold text-slate-700 absolute right-[10px] bg-blue-200 z-50 rounded ${isOverflowing ? "rounded-br-none" : "rounded-tr-none"}  shadow`}
        >
            <button 
                onClick={handleEditClick} 
                className={`flex items-center justify-start text-left p-2 px-3 w-full hover:bg-blue-300 h-8 transition-colors ease-in-out ${isOverflowing ? "rounded-t" : "rounded-tl"}`}
            >
                Edit
            </button>
            <button
                onClick={handleDeleteClick}
                className={`flex items-center justify-start text-left p-2 px-3 w-full hover:bg-red-300 h-8  transition-colors ease-in-out ${isOverflowing ? "rounded-bl" : "rounded-b"}`}
            >
                Delete
            </button>
        </div>
    );
};

export default TaskMenu;
