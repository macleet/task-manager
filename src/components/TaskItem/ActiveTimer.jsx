import axios from "axios";
import { useState, useEffect } from "react";
import { useActiveTaskContext } from "../../context/ActiveTaskContext";

export default ({taskId, editTaskId}) => {
    const {isActive, setIsActive, setActiveTaskId} = useActiveTaskContext();
    const [activeTime, setActiveTime] = useState(0);

    useEffect(() => {
        const getElapsedTime = async () => {
            try {
                const response = await axios.get("https://task-manager-server-6eht.onrender.com/times", {
                    params: {
                        taskId: taskId
                    }
                });
                setActiveTime(response.data.elapsedMinutes);
            } catch (error) {
                console.error("Error fetching elapsed time", error);
            }
        };
    }, []);

    const toggleActiveTask = async (event) => {
        try {
            await axios.put("https://task-manager-server-6eht.onrender.com/times/setActive", {
                params: {
                    taskId: taskId,
                    isActive: event.target.checked
                }
            });
            setIsActive(event.target.checked);
            if (event.target.checked) setActiveTaskId(taskId);
        } catch (error) {
            console.error("Error toggling active task", error);
        }
    };

    return(
        <div className={`h-16 col-span-2 flex justify-center items-center gap-2 text-black bg-opacity-40 transition-all ${editTaskId === taskId ? "bg-blue-400" : "bg-white"}`} >
            <p>{activeTime}</p>
            <input value={isActive} onChange={toggleActiveTask} type="checkbox" />
        </div>
    );
}