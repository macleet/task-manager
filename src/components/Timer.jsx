import { useState, useEffect } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { SessionNode, SessionCircularList } from '../utilities/Session';
import { useActiveTaskContext } from '../context/ActiveTaskContext';
import { useTimerContext } from '../context/TimerContext';
import { getActiveTask, setElapsedMinutes, setRestedMinutes } from '../utilities/api';

export default ({}) => {
    const { activeTaskId } = useActiveTaskContext();
    const [activeTask, setActiveTask] = useState({
        taskName: "",
        folderName: ""
    });
    const [currentSession, setCurrentSession] = useState(null);
    const [timerTime, setTimerTime] = useState({
        minutes: 0,
        seconds: 0
    });
    const {paused, setPaused} = useTimerContext();
    const [pausedTime, setPausedTime] = useState({
        minutes: 0,
        seconds: 0
    });

    const updateMinutes = async () => {
        const elapsedMinutes = Math.round(((pausedTime.minutes - timerTime.minutes) * 60 - (pausedTime.seconds - timerTime.seconds)) / 60);
        try {
            if (currentSession.type === "work") await setElapsedMinutes(activeTaskId, elapsedMinutes);
            else await setRestedMinutes(activeTaskId, elapsedMinutes);
            setPaused(!paused);
            setPausedTime({
                minutes: timerTime.minutes,
                seconds: timerTime.seconds
            });
        } catch (error) {
            console.error("Error updating minutes", error)
        }
    };

    useEffect(() => {
        const setActiveTaskDetails = async () => {
            try {
                if (activeTaskId > 0) {
                    const { taskName, folderName } = await getActiveTask(activeTaskId);
                    setActiveTask({ taskName, folderName });
                }
            } catch {
                console.error("Error setting active task details for timer", error);
            }
        }
        setActiveTaskDetails();

        const sessionQueue = new SessionCircularList();
        const workSession = new SessionNode("work", 30);
        const breakSession = new SessionNode("break", 10);
        const longBreakSession = new SessionNode("longbreak", 25);

        sessionQueue.append(workSession);
        sessionQueue.append(breakSession);
        sessionQueue.append(workSession);
        sessionQueue.append(longBreakSession);

        setCurrentSession(sessionQueue.head);
        setTimerTime({
            minutes: sessionQueue.head.duration,
            seconds: 0
        });
        setPausedTime({
            minutes: sessionQueue.head.duration,
            seconds: 0
        });
    }, [activeTaskId]);

    useEffect(() => {
        if (paused) return;
        if (timerTime.minutes === 0 && timerTime.seconds === 0) {
            updateMinutes();
            handleNext();
            return;
        }
        if (timerTime.seconds === -1 && timerTime.minutes > 0) {
            setTimerTime({
                minutes: timerTime.minutes - 1,
                seconds: 59
            });
        }
        if (timerTime.seconds < 60) {
            const timerId = setTimeout(() => setTimerTime((prev) => ({...prev, seconds: prev.seconds - 1})), 1);
            return () => clearTimeout(timerId);
        }
    }, [timerTime.seconds, paused]);

    const handleTogglePause = async () => {
        if (activeTaskId < 0) {
            setPaused(!paused);
            return;
        }
        updateMinutes();
    };

    const handleNext = () => {
        setPaused(true);
        setCurrentSession(currentSession.next);
        setTimerTime({
            minutes: currentSession.next.duration,
            seconds: 0
        });
        setPausedTime({
            minutes: currentSession.next.duration,
            seconds: 0
        });
    };

    const handlePrev = () => {
        setPaused(true);
        setCurrentSession(currentSession.prev);
        setTimerTime({
            minutes: currentSession.prev.duration,
            seconds: 0
        });
        setPausedTime({
            minutes: currentSession.prev.duration,
            seconds: 0
        });
    };

    return(
        <div className="flex flex-col justify-center items-center w-full p-4 gap-5 text-gray-800 bg-blue-200 rounded-xl shadow border-2 border-blue-500 border-opacity-40" >
            <div className="text-3xl font-semibold w-full flex justify-center items-center" >
                <span>{timerTime.minutes}</span>
                :
                <span>{timerTime.seconds < 10 ? "0" + timerTime.seconds.toString() : timerTime.seconds}</span>
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
