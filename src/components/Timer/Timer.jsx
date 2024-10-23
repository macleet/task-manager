import TimerTile from "./TimerTile.jsx";
import FocusTile from "./FocusTile.jsx";
import GraphTile from "./GraphTile.jsx";
import StatsTile from "./StatsTile.jsx";

import {
    useState,
} from 'react';

export default () => {
    // const [workHours, setWorkHours] = useState(0);
    // const [breakHours, setBreakHours] = useState(0);

    const [timeStats, setTimeStats] = useState({workTime: 0, breakTime: 0});

    return(
        <div className='p-2 w-full grid grid-cols-6 gap-6 flex-col overflow-auto grid-rows-2 min-h-96' >
            <TimerTile timeStats={timeStats} setTimeStats={setTimeStats} />
            <FocusTile />
            <StatsTile timeStats={timeStats} />
            <GraphTile />
        </div>
    );
}