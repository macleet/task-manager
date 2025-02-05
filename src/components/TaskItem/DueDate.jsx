export default ({dueDate, taskId, editTaskId}) => {
    return(
        <div className={`relative h-16 col-span-2 flex justify-center items-center text-black bg-opacity-40 transition-all ${editTaskId === taskId ? "bg-blue-400" : "bg-white"}`}>
            {dueDate && <p className="flex justify-center items-center text-center">
                {(new Date(dueDate)).toLocaleDateString("en-US")}
            </p>}
        </div>
    );
}