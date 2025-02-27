import { useState, useEffect } from "react";

export default ({edit, notes, setTaskDetails}) => {
    const [taskNotes, setTaskNotes] = useState(notes);

    const changeNotes = (event) => {
        if (event.target.value.length <= 500) setTaskNotes(event.target.value);
        if (edit) setTaskDetails(prev => ({...prev, name: event.target.value}));
    };

    return(
        <div className="flex flex-col gap-1.5" >
            <p className="flex items-center text-[13px] font-medium" >Notes</p>
            <div className="w-full h-32" >
                <textarea
                    value={taskNotes}
                    onChange={changeNotes}
                    readOnly={!edit || notes.length > 500} 
                    className={`${!edit && "outline-none"} ${notes.length === 500 && "outline-1 outline-red-300"} w-full h-full rounded scroll-small p-2 leading-[20px] text-[13px] resize-none`} 
                />
            </div>
            <span className={`${taskNotes.length === 500 && "text-red-500"} self-end text-xs transition-colors ease-in-out`} >{taskNotes.length}/500</span>
        </div>
    );
};