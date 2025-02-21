import axios from "axios";
import { useState, useEffect } from "react";
import { useActiveTaskContext } from "../../context/ActiveTaskContext";
import { useTimerContext } from "../../context/TimerContext";

export default ({ taskId, editTaskId }) => {
    const { activeTaskId, setActiveTaskId } = useActiveTaskContext();
    const { paused } = useTimerContext();
    const [isActive, setIsActive] = useState(false);
    const [activeTime, setActiveTime] = useState(0);

    const fetchActive = async () => {
        try {
            const response = await axios.get("https://task-manager-server-6eht.onrender.com/times/getActive", {
                params: {
                    taskId: taskId
                }
            });
            setIsActive(response.data.active);
        } catch (error) {
            console.error("Error fetching current active task", error);
        }
    };

    useEffect(() => {
        if (!paused) return; // Update elapsed time only when paused

        const initializeTime = async () => {
            try {
                await fetchActive();
                const response = await axios.get("https://task-manager-server-6eht.onrender.com/times/getElapsedMinutes", {
                    params: {
                        taskId: taskId
                    }
                });
                if (response.data.active) setActiveTaskId(taskId);
                setActiveTime(response.data.elapsedMinutes);
            } catch (error) {
                console.error("Error fetching elapsed time", error);
            }
        };
        initializeTime();
    }, [paused]);

    useEffect(() => {
        fetchActive();
    }, [activeTaskId]);

    const toggleActiveTask = async (event) => {
        const isChecked = event.target.checked;
        try {
            await axios.patch("https://task-manager-server-6eht.onrender.com/times/setActive", {
                taskId: taskId,
                isActive: isChecked
            });
            await fetchActive();
            setActiveTaskId(isChecked ? taskId : -1);
        } catch (error) {
            console.error("Error toggling active task", error);
        }
    };

    return (
        <div className={`h-16 col-span-2 flex flex-col justify-center items-center gap-0.5 text-black bg-opacity-40 transition-all ${editTaskId === taskId ? "bg-blue-400" : "bg-white"}`}>
            <p>{activeTime}</p>
            <input checked={isActive} title="Set active task" onChange={toggleActiveTask} type="checkbox" />
        </div>
    );
};
