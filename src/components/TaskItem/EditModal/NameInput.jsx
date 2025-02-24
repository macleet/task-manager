export default ({edit, name, setTaskDetails}) => {
    const handleInputChange = (event) => {
        if (!edit) return;
        setTaskDetails(prev => ({...prev, name: event.target.value}));
    };

    return(
        <div className="flex flex-col justify-center gap-1 w-full max-w-[100%]" >
            <input
                readOnly={!edit} 
                value={name}    
                onChange={handleInputChange} 
                className={`flex items-center font-medium p-1 px-2 rounded transition-all text-sm bg-inherit -ml-2 ${edit ? "bg-white" : "outline-none"}`} 
            />
        </div>
    );
};