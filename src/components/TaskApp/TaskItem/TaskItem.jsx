import { useEffect, useRef, useState } from 'react';
import EditModal from '../EditModal.jsx';
import ActionButton from './ActionButton.jsx';
import ActiveTimer from './ActiveTimer.jsx';
import DueDate from './DueDate.jsx';
import PriorityIndicator from './PriorityIndicator.jsx';
import SubtaskButton from './SubtaskButton.jsx';
import Subtasks from '../Subtask/Subtasks.jsx';

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
    const [subtaskIsOpen, setSubtaskIsOpen] = useState(false);

    // Scroll to the new task if it's added
    useEffect(() => {
        if (newTask.folderId > 0) tasksEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, [newTask]);

    return (
        <div ref={tasksEndRef} className="grid grid-cols-[repeat(13,_minmax(0,_1fr))] text-opacity-90 border-y-[1.25px] text-[15px]">
            <SubtaskButton 
                subtaskIsOpen={subtaskIsOpen}
                setSubtaskIsOpen={setSubtaskIsOpen}
                taskId={taskId}
                editTaskId={editTaskId}
            />

            <PriorityIndicator taskId={taskId} editTaskId={editTaskId} />

            {/* Task name */}
            <div className={`h-16 col-span-6 flex items-center bg-opacity-40 transition-all ${editTaskId === taskId ? "bg-blue-400" : "bg-white"}`}>
                <p className="bg-transparent w-full transition-all text-black">{name}</p>
            </div>
            
            <DueDate 
                dueDate={dueDate}
                taskId={taskId}
                editTaskId={editTaskId}
            />

            <ActiveTimer 
                activeSeconds={activeSeconds} 
                editTaskId={editTaskId}
                taskId={taskId}
            />

            <ActionButton
                taskId={taskId}
                editTaskId={editTaskId}
                setEditTaskId={setEditTaskId}
                setTaskDeleted={setTaskDeleted}
                parentBottom={parentBottom}
            />

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

            <Subtasks name={name} taskId={taskId} subtaskIsOpen={subtaskIsOpen} />
        </div>
    );
};

export default TaskItem;
