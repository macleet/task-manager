import {
   useEffect,
} from 'react';

import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';

import Tile from './Tile.jsx';

export default ({timeStats}) => {
   useEffect(() => {
      // console.log(timeStats);
   }, [timeStats]);

   return(
      <Tile rowSpan={1} colSpan={2} style="justify-center gap-3 text-nowrap text-gray-700 font-semibold " >
         <div className="w-full flex flex-col justify-between py-2 px-3 bg-slate-500 hover:bg-orange-500 bg-opacity-10 hover:bg-opacity-20 transition-colors h-full rounded-md shadow-sm">
            <div className="h-fit w-fit" >
               <WorkHistoryIcon sx={{ fontSize: 50 }} />
            </div>
            <div className="flex justify-between items-end " >
               <span>Worked</span>
               <span><span className="text-xl">{timeStats.workTime}</span> hrs</span>
            </div>
         </div>

         <div className="w-full flex flex-col justify-between py-2 px-3 bg-slate-500 hover:bg-blue-900 bg-opacity-10 hover:bg-opacity-20 transition-colors h-full rounded-md shadow-sm">
            <div className="h-1/2 w-fit" >
               <SelfImprovementIcon sx={{ fontSize: 56 }} />
            </div>
            <div className="flex justify-between items-end" >
               <span>Rested</span>
               <span><span className="text-xl">{timeStats.breakTime}</span> hrs</span>
            </div>
         </div>
      </Tile>
   );
};
