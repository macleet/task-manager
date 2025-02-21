import {
    useState,
    useEffect,
} from 'react'
import axios from 'axios';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { SessionNode, SessionCircularList } from '../utilities/Session';
import { useActiveTaskContext } from '../context/ActiveTaskContext';
import { useTimerContext } from '../context/TimerContext';

export default ({}) => {
    const { activeTaskId } = useActiveTaskContext();
    const [activeTask, setActiveTask] = useState({
        taskName: "",
        folderName: ""
    });
    const [currentSession, setCurrentSession] = useState(null);
    const [minutes, setMinutes] = useState(null);
    const [seconds, setSeconds] = useState(0);
    const {paused, setPaused} = useTimerContext();

    useEffect(() => {
        if (currentSession) return;

        const sessionQueue = new SessionCircularList();
        const workSession = new SessionNode("work", 30);
        const breakSession = new SessionNode("break", 10);
        const longBreakSession = new SessionNode("longbreak", 25);

        sessionQueue.append(workSession);
        sessionQueue.append(breakSession);
        sessionQueue.append(workSession);
        sessionQueue.append(longBreakSession);

        setCurrentSession(sessionQueue.head);
        setMinutes(sessionQueue.head.duration);
    }, []);

    useEffect(() => {
        if (activeTaskId > 0) {
            const getActiveTask = async () => {
                try {
                    const response = await axios.get("https://task-manager-server-6eht.onrender.com/times/getActiveTask", {
                        params: {
                            taskId: activeTaskId
                        }
                    });
                    const { taskName, folderName } = response.data;
                    setActiveTask({ taskName, folderName });
                } catch (error) {
                    console.error("Error retrieving (GET) active task info", error);
                }
            };
            getActiveTask();
        }
    }, [activeTaskId]);

    useEffect(() => {
        if (paused) return;
        if (minutes === 0 && seconds === 0) return;
        if (seconds === -1 && minutes > 0) {
            setMinutes(minutes-1);
            setSeconds(59);
        }
        if (seconds < 60) {
            const timerId = setTimeout(() => setSeconds(seconds-1), 10);
            return () => clearTimeout(timerId);
        }
    }, [seconds, paused]);

    const handleTogglePause = async () => {
        setPaused(!paused);

        if (paused || activeTaskId < 0) return;

        const elapsedMinutes = Math.round(((currentSession.duration - minutes) * 60 - seconds) / 60);
        if (currentSession.type === "work") {
            try {
                await axios.patch("https://task-manager-server-6eht.onrender.com/times/setElapsedMinutes", {
                    taskId: activeTaskId,
                    elapsedTime: elapsedMinutes
                });
            } catch (error) {
                console.error("Error sending patch request to set elapsed minutes", error);
            }
        } else {
            try {
                await axios.patch("https://task-manager-server-6eht.onrender.com/times/setRestedMinutes", {
                    taskId: activeTaskId,
                    elapsedTime: elapsedMinutes
                });
            } catch (error) {
                console.error("Error sending patch request to set rested minutes", error);
            }
        }
    };

    const handleNext = () => {
        setSeconds(0);
        setPaused(true);
        setCurrentSession(currentSession.next);
        setMinutes(currentSession.next.duration);      
    };

    const handlePrev = () => {
        setSeconds(0);
        setPaused(true);
        setCurrentSession(currentSession.prev);
        setMinutes(currentSession.prev.duration);  
    };

    return(
        <div className="flex flex-col justify-center items-center w-full p-4 gap-5 text-gray-800 bg-blue-200 rounded-xl shadow border-2 border-blue-500 border-opacity-40" >
            <div className="text-3xl font-semibold w-full flex justify-center items-center" >
                <span>{minutes}</span>
                :
                <span>{seconds < 10 ? "0" + seconds.toString() : seconds}</span>
            </div>

            <div className={`text-lg shadow-sm w-fit flex items-center justify-center p-2 gap-8 bg-blue-400 bg-opacity-70 rounded-full`} >
                <button className="flex hover:text-slate-600 transition-colors" onClick={handlePrev} >
                    <SkipPreviousIcon sx={{fontSize: "20px"}} />
                </button>
                <button className="flex hover:text-slate-600 transition-colors" onClick={handleTogglePause} >
                    {paused ? <PlayArrowIcon sx={{fontSize: "20px"}} /> : <PauseIcon sx={{fontSize: "20px"}} />}
                </button>
                <button className="flex hover:text-slate-600 transition-colors" onClick={handleNext} >
                    <SkipNextIcon sx={{fontSize: "20px"}} />
                </button>
            </div>

            <span className='font-medium text-lg'>
                {currentSession !== null && currentSession.type === "work" && "Focus time!"}
                {currentSession !== null && currentSession.type === "break" && "Short break!"}
                {currentSession !== null && currentSession.type === "longbreak" && "Long break!"}
            </span>

            <div className={`${activeTaskId < 0 && "hidden"} w-full flex flex-col gap-0.5`} >
                <p className="text-sm font-medium text-slate-600" >Current task</p>
                <div className="flex flex-col justify-center bg-blue-300 rounded py-1 px-2">
                    <p className="text-sm font-medium" >{activeTask.taskName}</p>
                    <p className="text-sm text-slate-600" >{activeTask.folderName}</p>
                </div>
            </div>
        </div>
    );
};
