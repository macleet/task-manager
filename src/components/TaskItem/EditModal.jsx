import Calendar from "react-calendar";
import axios from "axios";

import {
    useState,
    useRef,
} from "react";

export default ({taskId, name, dueDate, priority, notes, activeSeconds, tags, editTaskId, setEditTaskId}) => {
    const nameRef = useRef(null);
    const calendarRef = useRef(null);

    const [edit, setEdit] = useState(false);
    const [taskDetails, setTaskDetails] = useState({
        name: name,
        dueDate: dueDate,
        priority: priority,
        notes: notes,
        activeSeconds: activeSeconds,
        tags: tags,
    });

    const patchName = async () => {
        try {
            await axios.patch(`https://task-manager-server-6eht.onrender.com/task/nameChange/${taskId}`, { "newName": taskDetails.name });
        } catch (error) {
            console.error("Error patching name", error);
        }
    };

    const patchPriority = async () => {
        try {
            await axios.patch(`https://task-manager-server-6eht.onrender.com/task/priority`, { 
                newPriority: taskDetails.priority,
                taskId: taskId
            });
        } catch (error) {
            console.error("Error patching priority", error);
        }
    };

    const patchDueDate = async () => {
        try {
            await axios.patch(`https://task-manager-server-6eht.onrender.com/task/dateChange/${taskId}`, {	
                "new_date": taskDetails.dueDate,
            });
        } catch (error) {
            console.error("Error patching due date", error);
        }
    };
    
    // Edit / Submit button handlers
    const handleEditClick = () => setEdit(true);
    const handleSubmitClick = async () => {
        await patchName();
        await patchDueDate();
        await patchPriority();
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

    // Name display / input handlers
    const handleInputDblClick = () => setEdit(true);
    const handleInputChange = (event) => {
        if (!edit) return;
        setTaskDetails({...taskDetails, name: event.target.value});
    };

    // Priority slider handler
    const handlePriorityClick = (event) => {
        if (!edit) return;
        switch(event.target.textContent) {
            case "High":
                setTaskDetails({...taskDetails, priority: 3});
                break;
            case "Medium":
                setTaskDetails({...taskDetails, priority: 2});
                break;
            case "Low":
                setTaskDetails({...taskDetails, priority: 1});
                break;
        }
    };

    // Calendar handler
    const handleDayClick = async (newDate) => {
        if (!edit) return;
        setTaskDetails({...taskDetails, dueDate: newDate});
    };

    return(
        editTaskId === taskId && <div className={`flex justify-center items-center w-full bg-black bg-opacity-50 inset-0 z-50 fixed transition-all duration-200`} >
            <div className="rounded-lg overflow-y-auto scroll w-1/3 h-5/6 flex flex-col p-6 gap-4 text-slate-900 text-opacity-95 from-blue-100 to-blue-50 bg-gradient-to-tl to-75%">
                {/* Task header */}
                <div className="flex justify-between" >
                    {/* Task name input */}
                    <div className="flex flex-col justify-center gap-1 w-full max-w-[50%]" >
                        <input 
                            ref={nameRef} 
                            onDoubleClick={handleInputDblClick} 
                            readOnly={!edit} 
                            onChange={handleInputChange} 
                            className={`flex items-center font-medium p-1 px-2 rounded transition-all text-sm bg-inherit -ml-2 ${edit ? "bg-white" : "outline-none"}`} 
                            value={taskDetails.name} 
                        />
                    </div>

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
                
                {/* Priority sliding tab */}
                <div className="flex flex-col gap-1.5" >
                    <p className="flex items-center text-[13px] font-medium" >Priority</p>
                    <div className="flex gap-1 bg-red w-full p-1 border-2 border-slate-200 rounded-lg relative">
                        <button 
                            className={`flex justify-center items-center h-12 w-1/3 rounded-md text-sm font-medium text-slate-700 transition-all ease-in-out ${taskDetails.priority === 3 ? "border-[3px] border-red-400 bg-red-300" : "bg-red-200 bg-opacity-50 text-opacity-70"}`} 
                            onClick={handlePriorityClick}
                        >
                            High
                        </button>
                        <button 
                            className={`flex justify-center items-center h-12 w-1/3 rounded-md text-sm font-medium text-slate-700 transition-all ease-in-out ${taskDetails.priority === 2 ? "border-[3px] border-orange-400 bg-orange-300" : "bg-orange-200 bg-opacity-50 text-opacity-70"}`} 
                            onClick={handlePriorityClick}
                        >
                            Medium
                        </button>
                        <button 
                            className={`flex justify-center items-center h-12 w-1/3 rounded-md text-sm font-medium text-slate-700 transition-all ease-in-out ${taskDetails.priority === 1 ? "border-[3px] border-green-400 bg-green-300" : "bg-green-200 bg-opacity-50 text-opacity-70"}`} 
                            onClick={handlePriorityClick}
                        >
                            Low
                        </button>
                    </div>
                </div>

                {/* Calendar */}
                <div className="flex flex-col gap-1.5" >
                    <p className="flex items-center text-[13px] font-medium" >Due Date</p>
                    <div className="flex justify-center self-center bg-blue-100 p-5 rounded-lg">
                        <Calendar 
                            ref={calendarRef}
                            onClickDay={handleDayClick}
                            value={taskDetails.dueDate}
                            calendarType="gregory"
                            className="flex flex-col text-center rounded-md"
                        />
                    </div>
                </div>

                {/* Notes */}
                <div className="flex flex-col gap-1.5" >
                    <p className="flex items-center text-[13px] font-medium" >Notes</p>
                    <div className="w-full h-32 " >
                        <textarea 
                            readOnly={!edit} 
                            className={`${!edit && "outline-none"} w-full h-full rounded scroll-small p-2 leading-[20px] text-[13px] resize-none`} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};