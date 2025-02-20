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

export default ({}) => {
    const [currentSession, setCurrentSession] = useState(null);
    const [minutes, setMinutes] = useState(null);
    const [seconds, setSeconds] = useState(0);
    const [paused, setPaused] = useState(true);

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
        if (paused) return;

        if (minutes === 0 && seconds === 0) {
            return;
        }   

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
        if (!paused) {
            const elapsedMinutes = currentSession.duration - minutes;
            switch (currentSession.type) {
                case "work":
                    // timeStats.workTime = timeStats.workTime + elapsedMinutes;
                    // setTimeStats({...timeStats});
                    break;
                case "break":
                case "longbreak":
                    // timeStats.breakTime = timeStats.breakTime + elapsedMinutes;
                    // setTimeStats({...timeStats});
                    break;
                default:
                    console.error("Unknown session type.");
            }
        }
        setPaused(!paused);
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
        </div>
    );
};
