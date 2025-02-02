export default ({taskId, editTaskId, activeSeconds}) => {
    return(
        <p className={`h-16 col-span-2 flex justify-center items-center text-black bg-opacity-40 transition-all ${editTaskId === taskId ? "bg-blue-400" : "bg-white"}`}>
            {activeSeconds}s
        </p>
    );
}