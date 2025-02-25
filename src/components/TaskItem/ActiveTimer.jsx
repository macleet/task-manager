import { useState, useEffect } from "react";
import { useActiveTaskContext } from "../../context/ActiveTaskContext";
import { useTimerContext } from "../../context/TimerContext";
import { useDurationContext } from "../../context/DurationContext";
import { getActiveDurationText, getIsActive, getRestedDurationText, patchIsActive } from "../../utilities/api";

export default ({ taskId, editTaskId }) => {
    const { activeTaskId, setActiveTaskId } = useActiveTaskContext();
    const { paused } = useTimerContext();
    const { activeTime, setActiveTime, setRestedTime } = useDurationContext();
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (!paused) return; // Update elapsed time only when paused

        const initializeTime = async () => {
            const active = await getIsActive(taskId);
            setIsActive(active);
            if (active) setActiveTaskId(taskId);

            const activeDurationText = await getActiveDurationText(taskId);
            setActiveTime(activeDurationText);

            const restedDurationText = await getRestedDurationText(taskId);
            setRestedTime(restedDurationText);
        };
        initializeTime();
    }, [paused]);

    useEffect(() => {
        const getIsActiveFromApi = async () => {
            const active = await getIsActive(taskId);
            setIsActive(active);
        };
        getIsActiveFromApi();
    }, [activeTaskId]);

    const toggleActiveTask = async (event) => {
        const isChecked = event.target.checked;
        await patchIsActive(taskId, isChecked);

        setIsActive(prev => !prev);
        setActiveTaskId(isChecked ? taskId : -1);
    };

    return (
        <div className={`h-16 col-span-2 flex flex-col justify-center items-center gap-0.5 text-black bg-opacity-40 transition-all ${editTaskId === taskId ? "bg-blue-400" : "bg-white"}`}>
            <p>{activeTime}</p>
            <input checked={isActive} title="Set active task" onChange={toggleActiveTask} type="checkbox" />
        </div>
    );
};
