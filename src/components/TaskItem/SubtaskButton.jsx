import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export default ({subtaskIsOpen, setSubtaskIsOpen, taskId, editTaskId}) => {
    const handleSubtaskClick = () => setSubtaskIsOpen(!subtaskIsOpen);

    return(
        <div className={`h-16 flex justify-center items-center col-span-1 bg-opacity-40 transition-all ${editTaskId === taskId ? "bg-blue-400" : "bg-white"}`}>
            <button 
                className={`${subtaskIsOpen ? "rotate-90 text-slate-700" : "rotate-0 text-opacity-60 text-slate-500"} hover:text-slate-700 transition-all ease-in-out duration-400`}
                onClick={handleSubtaskClick}    
            >
                <ArrowRightIcon />
            </button>
        </div>
    );
}