export default ({taskId, editTaskId}) => {
    return(
        <div className={`h-16 flex justify-center items-center col-span-1 bg-opacity-40 transition-all ${editTaskId === taskId ? "bg-blue-400" : "bg-white"}`}>
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
        </div>
    );
};