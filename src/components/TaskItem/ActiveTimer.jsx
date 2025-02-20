import axios from "axios";
import { useState, useEffect } from "react";
import { useActiveTaskContext } from "../../context/ActiveTaskContext";

export default ({taskId, editTaskId}) => {
    const {setActiveTaskId} = useActiveTaskContext();
    const [isActive, setIsActive] = useState(false);
    const [activeTime, setActiveTime] = useState(0);

    useEffect(() => {
        const getElapsedTime = async () => {
            try {
                const response = await axios.get("https://task-manager-server-6eht.onrender.com/times", {
                    params: {
                        taskId: taskId
                    }
                });
                setIsActive(response.data.active);
                setActiveTime(response.data.elapsedMinutes);
            } catch (error) {
                console.error("Error fetching elapsed time", error);
            }
        };
        getElapsedTime();
    }, []);

    const toggleActiveTask = async (event) => {
        try {
            await axios.patch("https://task-manager-server-6eht.onrender.com/times/setActive", {
                taskId: taskId,
                isActive: event.target.checked
            });
            setIsActive(event.target.checked);
            if (event.target.checked) setActiveTaskId(taskId);
            else setActiveTaskId(-1);
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