import Tile from "./Tile.jsx";
import WeekNavigator from "./WeekNavigator.jsx";

import WeekPeriod from "../../utilities/WeekPeriod.js";

import axios from "axios";

import { Bar } from "react-chartjs-2";
import { 
   Chart as ChartJS, 
   CategoryScale, 
   LinearScale, 
   BarElement, 
   Title, 
   Tooltip, 
   Legend 
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

import {
   useState,
   useEffect,
} from 'react';

export default () => {
   const [weekPeriod, setWeekPeriod] = useState(new WeekPeriod());
   const [weekData, setWeekData] = useState({
      rest: [2, 1, 1, 1, 2, 3, 0], 
      work: [5, 3, 3, 4, 5, 8, 1],
   });

   const data = {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [
         {
            label: 'Rested',
            data: weekData.rest,
            backgroundColor: '#66738d',
            borderRadius: 2,
         },
         {
            label: 'Worked',
            data: weekData.work,
            backgroundColor: 'rgb(192, 157, 126)',
            borderRadius: 2,
         },
      ],

   };

   const options = {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
         backgroundColor: '#f0f0f0',
         padding: {
            top: 5,
            bottom: 18,
            left: 100, 
            right: 100,
         },
      },
      plugins: {
         legend: {
            position: 'top',
            labels: {
               font: {
                  size: 13, 
                  weight: 600,
               },
               pointStyle: 'rectRounded',
               usePointStyle: true,
               padding: 20, 
               color: "#333b4b",
            },
         },
      },
      scales: {
         x: {
            stacked: true, 
            grid: {
               display: false,
            },
            ticks: {
               font: {
                  size: 11.5,
                  weight: 600,
               },
               color: "#333b4b",
            },
         },
         y: {
            grid: {
               display: false,
               color: "#333b4b",
            },
            ticks: {
               font: {
                  size: 11,
                  weight: 600,
               },
               maxTicksLimit: 6,
               color: "#333b4b",
            },
            beginAtZero: true,
         },
      },
   };

   useEffect(() => {
      const getGraphData = async () => {
         try {
            const response = await axios.get("https://localhost:8000");
            // weekData.rest = response.data;
            // weekData.work = response.data;
            // response.data = 
            setWeekData({
               rest: weekData.rest, 
               work: weekData.work
            });
            
         } catch (err) {
            console.error("Axios GET request error (graph data): ", err);
         }
      };

      getGraphData();
   }, [weekPeriod]);

   return(
      <Tile colSpan={4} rowSpan={1} style="justify-center items-center py-10 overflow-hidden text-gray-700 font-medium" >
         <span className="w-full text-lg" >Weekly Productivity</span>
         <Bar data={data} options={options} height={0} width={0} />
         <WeekNavigator weekPeriod={weekPeriod} setWeekPeriod={setWeekPeriod} />
      </Tile>
   );
};
