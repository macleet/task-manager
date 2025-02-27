import Calendar from "react-calendar";

export default ({ edit, dueDate, setTaskDetails }) => {
    const handleDayClick = async newDate => {
        console.log(new Date(dueDate).toDateString());
        if (!edit) return;
        setTaskDetails(prev => ({...prev, dueDate: newDate}));
    };

    return(
        <div className="flex flex-col gap-1.5" >
            <p className="flex items-center text-[13px] font-medium" >Due Date</p>
            <div className="flex justify-center self-center bg-blue-100 p-5 rounded-lg">
                <Calendar 
                    prev2Label={edit ? undefined : null}
                    prevLabel={edit ? undefined : null}
                    nextLabel={edit ? undefined : null}
                    next2Label={edit ? undefined : null}
                    minDetail={edit ? "year" : "month"}
                    onClickDay={handleDayClick}
                    value={dueDate}
                    calendarType="gregory"
                    className="flex flex-col text-center rounded-md"
                />
            </div>
        </div>
    );
};