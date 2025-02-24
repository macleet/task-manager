const HIGH = 3, MEDIUM = 2, LOW = 1;

export default ({edit, priority, setTaskDetails}) => {
    const handlePriorityClick = (event) => {
        if (!edit) return;
        switch(+event.target.value) {
            case HIGH:
                setTaskDetails(prev => ({...prev, priority: HIGH}));
                break;
            case MEDIUM:
                setTaskDetails(prev => ({...prev, priority: MEDIUM}));
                break;
            case LOW:
                setTaskDetails(prev => ({...prev, priority: LOW}));
                break;
        }
    };

    return(
        <div className="flex flex-col gap-1.5" >
            <p className="flex items-center text-[13px] font-medium" >Priority</p>
            <div className="flex gap-1 bg-red w-full p-1 border-2 border-slate-200 rounded-lg relative">
                <button 
                    className={`flex justify-center items-center h-12 w-1/3 rounded-md text-sm font-medium text-slate-700 transition-all ease-in-out ${priority === HIGH ? "border-[3px] border-red-400 bg-red-300" : "bg-red-200 bg-opacity-50 text-opacity-70"}`} 
                    onClick={handlePriorityClick}
                    value={HIGH}
                >
                    High
                </button>
                <button 
                    className={`flex justify-center items-center h-12 w-1/3 rounded-md text-sm font-medium text-slate-700 transition-all ease-in-out ${priority === MEDIUM ? "border-[3px] border-orange-400 bg-orange-300" : "bg-orange-200 bg-opacity-50 text-opacity-70"}`} 
                    onClick={handlePriorityClick}
                    value={MEDIUM}
                >
                    Medium
                </button>
                <button 
                    className={`flex justify-center items-center h-12 w-1/3 rounded-md text-sm font-medium text-slate-700 transition-all ease-in-out ${priority === LOW ? "border-[3px] border-green-400 bg-green-300" : "bg-green-200 bg-opacity-50 text-opacity-70"}`} 
                    onClick={handlePriorityClick}
                    value={LOW}
                >
                    Low
                </button>
            </div>
        </div>
    );
};