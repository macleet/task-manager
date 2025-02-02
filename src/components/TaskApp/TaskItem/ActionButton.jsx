import MoreVertIcon from '@mui/icons-material/MoreVert';
import TaskMenu from '../TaskMenu.jsx';
import { useState } from "react";

export default ({
    taskId,
    editTaskId,
    setEditTaskId,
    setTaskDeleted,
    parentBottom
}) => {
	const [hover, setHover] = useState(false);

    const handleOnMouseEnter = () => setHover(true);
	const handleOnMouseLeave = () => setHover(false);

    return(
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
    );
}