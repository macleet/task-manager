import {
    useState,
    useEffect,
} from 'react'
import axios from 'axios';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

import Tile from './Tile.jsx';

class SessionNode {
    constructor(sessionType, sessionDuration) {
        this.type = sessionType;
        this.duration = sessionDuration;
        this.next = null;
        this.prev = null;
    }
}

class SessionCircularList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(sessionNode) {
        const newNode = new SessionNode(sessionNode.type, sessionNode.duration);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            newNode.next = this.head;
            newNode.prev = this.head;
            return;
        }

        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
        this.tail.next = this.head;
        this.tail.next.prev = this.tail;
    }
}

export default ({timeStats, setTimeStats}) => {
    const workSession = new SessionNode("work", 30);
    const breakSession = new SessionNode("break", 10);
    const longBreakSession = new SessionNode("longbreak", 25);
    
    const sessionQueue = new SessionCircularList();
    sessionQueue.append(workSession);
    sessionQueue.append(breakSession);
    sessionQueue.append(workSession);
    sessionQueue.append(longBreakSession);
    
    const [currentSession, setCurrentSession] = useState(sessionQueue.head);
    const [minutes, setMinutes] = useState(sessionQueue.head.duration);
    const [seconds, setSeconds] = useState(0);
    const [paused, setPaused] = useState(true);

    useEffect(() => {
        if (paused) return;

        if (minutes === 0 && seconds === 0) {
            return false;
        }   

        if (seconds === -1 && minutes > 0) {
            setMinutes(minutes-1);
            setSeconds(59);
        }
        
        if (seconds < 60) {
            const timerId = setTimeout(() => setSeconds(seconds-1), 1);
            return () => clearTimeout(timerId);
        }
    }, [seconds, paused]);

    const handleTogglePause = () => {
        if (!paused) {
            const elapsedMinutes = currentSession.duration - minutes;
            switch (currentSession.type) {
                case "work":
                    timeStats.workTime = timeStats.workTime + elapsedMinutes;
                    console.log(timeStats);
                    setTimeStats({...timeStats});
                    break;
                case "break":
                case "longbreak":
                    timeStats.breakTime = timeStats.breakTime + elapsedMinutes;
                    setTimeStats({...timeStats});
                    break;
                default:
                    console.error("Uknown session type.");
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
        <Tile colSpan={4} rowSpan={1} style="justify-center items-center gap-16 text-gray-700" >
            <div className="text-5xl font-semibold w-full flex justify-center items-center" >
                <span>{minutes}</span>
                :
                <span>{seconds < 10 ? "0" + seconds.toString() : seconds}</span>
            </div>

            <div className={`text-lg shadowp-sm w-fit flex items-center justify-center gap-8 p-2 bg-slate-500 bg-opacity-70 rounded-full`} >
                <button className="hover:text-slate-500 transition-colors" onClick={handlePrev} >
                    <SkipPreviousIcon sx={{fontSize: "35px"}} />
                </button>
                <button className="hover:text-slate-500 transition-colors" onClick={handleTogglePause} >
                    {paused ? <PlayArrowIcon sx={{fontSize: "35px"}} /> : <PauseIcon sx={{fontSize: "35px"}} />}
                </button>
                <button className="hover:text-slate-500 transition-colors" onClick={handleNext} >
                    <SkipNextIcon sx={{fontSize: "35px"}} />
                </button>
            </div>

            <span className='font-medium text-xl'>
                {currentSession.type === "work" && "Focus time!"}
                {currentSession.type === "break" && "Short break!"}
                {currentSession.type === "longbreak" && "Long break!"}
            </span>
        </Tile>
    );
};
