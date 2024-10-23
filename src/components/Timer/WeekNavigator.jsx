import {
    useState,
    useEffect,
} from 'react';

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import WeekPeriod from '../../utilities/WeekPeriod';

export default ({weekPeriod, setWeekPeriod}) => {

    const handleLeftClick = () => {
        weekPeriod.prevPeriod();
        setWeekPeriod(new WeekPeriod(weekPeriod.start, weekPeriod.end));
    };

    const handleRightClick = () => {
        weekPeriod.nextPeriod();
        setWeekPeriod(new WeekPeriod(weekPeriod.start, weekPeriod.end));
    };

    return(
        <div className="w-full h-fit flex justify-center items-center font-bold">
            <button onClick={handleLeftClick} className="w-6 h-6 shadow-sm bg-slate-500 bg-opacity-40 hover:bg-opacity-80 transition-colors rounded flex justify-center items-center">
                <ArrowLeftIcon />
            </button>
            <div className="px-2 w-1/3" >
                <span className="flex justify-center text-sm text-nowrap" >
                    {(weekPeriod.start.month+1) + "/" + weekPeriod.start.date} - {(weekPeriod.end.month+1) + "/" + weekPeriod.end.date}
                </span>
            </div>
            <button  onClick={handleRightClick} className="w-6 h-6 shadow-sm bg-slate-500 bg-opacity-40 hover:bg-opacity-80 transition-colors rounded flex justify-center items-center" >
                <ArrowRightIcon />
            </button>
        </div>
    );
};