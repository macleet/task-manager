import { useEffect, useState } from 'react';
import axios from 'axios';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import { useDurationContext } from '../../../context/DurationContext';

export default ({ taskId }) => {
    const { activeTime, restedTime } = useDurationContext();
    // const [activeTime, setActiveTime] = useState("");
    // const [restedTime, setRestedTime] = useState("");

    // useEffect(() => {
    //     if (!paused) return;

    //     const initializeTimes = async () => {
    //         try {
    //             const response = await axios.get("https://task-manager-server-6eht.onrender.com/times/getElapsedMinutes", {
    //                 params: {
    //                     taskId: taskId
    //                 }
    //             });
    //             setActiveTime(response.data.durationText);
    //         } catch (error) {
    //             console.error("Error fetching elapsed time in Stats component", error);
    //         }

    //         try {
    //             const response = await axios.get("https://task-manager-server-6eht.onrender.com/times/getRestedMinutes", {
    //                 params: {
    //                     taskId: taskId
    //                 }
    //             });
    //             setRestedTime(response.data.durationText);
    //         } catch (error) {
    //             console.error("Error fetching rested time in Stats component", error);
    //         }
    //     };
    //     initializeTimes();
    // }, [paused]);

    return(
        <div className="flex w-1/5 flex-col gap-6" >
            <div className="w-full flex flex-col justify-between py-2 px-3 bg-blue-200 bg-opacity-40 h-1/2 rounded-xl shadow-sm">
                <div className="h-fit w-fit" >
                    <WorkHistoryIcon sx={{ fontSize: 40, color: "rgb(220 150 90)" }} />
                </div>
                <div className="flex justify-between items-end " >
                    <span className="font-medium" >Worked</span>
                    <span>{activeTime}</span>
                </div>
            </div>

            <div className="w-full flex flex-col justify-between py-2 px-3 bg-blue-200 bg-opacity-40 h-1/2 rounded-xl shadow-sm">
                <div className="h-1/2 w-fit" >
                    <SelfImprovementIcon sx={{ fontSize: 44, color: "rgb(59 150 246)" }} />
                </div>
                <div className="flex justify-between items-end" >
                    <span className="font-medium" >Rested</span>
                    <span>{restedTime}</span>
                </div>
            </div>
        </div>
    );
};