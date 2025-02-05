export default ({taskId, editTaskId, priority}) => {

    return(
        <div className={`h-16 flex justify-center items-center col-span-1 bg-opacity-40 transition-all ${editTaskId === taskId ? "bg-blue-400" : "bg-white"}`}>
            <div className={`w-3 h-3 rounded-full ${priority === 1 && "bg-green-600"} ${priority === 2 && "bg-orange-400"} ${priority === 3 && "bg-red-600"}`}></div>
        </div>
    );
};