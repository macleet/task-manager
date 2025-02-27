import { useState } from "react";
import NameInput from "./NameInput";
import PriorityPicker from "./PriorityPicker";
import DueDateCalendar from "./DueDateCalendar";
import Notes from "./Notes";
import { patchName, patchDueDate, patchPriority, patchNotes } from "../../../utilities/api";

export default ({taskId, name, dueDate, priority, notes, activeSeconds, tags, editTaskId, setEditTaskId}) => {
    const [edit, setEdit] = useState(false);
    const [taskDetails, setTaskDetails] = useState({
        name: name,
        dueDate: dueDate,
        priority: priority,
        notes: notes,
        activeSeconds: activeSeconds,
        tags: tags,
    });
    
    // Edit / Submit button handlers
    const handleEditClick = () => setEdit(true);
    const handleSubmitClick = async () => {
        await patchName(taskId, taskDetails.name);
        await patchDueDate(taskId, taskDetails.dueDate);
        await patchPriority(taskId, taskDetails.priority);
        await patchNotes(taskId, taskDetails.notes);
        setEdit(false);
        setEditTaskId(-1);
    };

    // Close / Cancel button handlers
    const handleCloseClick = () => {
        setEdit(false);
        setEditTaskId(-1);
    };
    const handleCancelClick = () => {
        setEdit(false);
        setTaskDetails({
            name: name,
            dueDate: dueDate,
            priority: priority,
            notes: notes,
            activeSeconds: activeSeconds,
            tags: tags,
        });
    };

    return(
        editTaskId === taskId && <div className={`flex justify-center items-center w-full bg-black bg-opacity-50 inset-0 z-50 fixed transition-all duration-200`} >
            <div className="rounded-lg overflow-y-auto scroll w-1/3 h-5/6 flex flex-col p-6 gap-4 text-slate-900 text-opacity-95 from-blue-100 to-blue-50 bg-gradient-to-tl to-75%">
                {/* Task header */}
                <div className="flex justify-between gap-3" >
                    <NameInput edit={edit} name={taskDetails.name} setTaskDetails={setTaskDetails} />

                    {/* Submit/Edit and Cancel/Close buttons */}
                    <div className="flex items-center h-full gap-3" >
                        <button type="button" onClick={edit ? handleSubmitClick : handleEditClick} className="flex p-2 py-1.5 bg-blue-300 transition-all bg-opacity-50 hover:bg-opacity-90 rounded text-slate-800 font-medium text-xs shadow" >
                            {edit ? "Submit" : "Edit"}
                        </button>
                        <button type="button" onClick={edit ? handleCancelClick : handleCloseClick} className="flex p-2 py-1.5 bg-blue-300 bg-opacity-50 hover:bg-red-200 hover:bg-opacity-80 rounded text-slate-800 transition-all font-medium text-xs shadow" >
                            {edit ? "Cancel" : "Close"}
                        </button>
                    </div>
                </div>
                
                <PriorityPicker edit={edit} priority={taskDetails.priority} setTaskDetails={setTaskDetails} />
                <DueDateCalendar edit={edit} dueDate={taskDetails.dueDate} setTaskDetails={setTaskDetails} />
                <Notes edit={edit} notes={taskDetails.notes} setTaskDetails={setTaskDetails} />
            </div>
        </div>
    );
};