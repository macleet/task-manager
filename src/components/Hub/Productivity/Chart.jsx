import WeekPeriod from "../../../utilities/WeekPeriod";
import WeekNavigator from "./WeekNavigator";
import { useEffect, useState } from "react";
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
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default ({ taskId }) => {
    const [weekPeriod, setWeekPeriod] = useState(new WeekPeriod());
    const [weekData, setWeekData] = useState({
        rest: [2, 1, 1, 1, 2, 3, 0], 
        work: [5, 3, 3, 4, 5, 8, 1],
    });

    const [chartData, setChartData] = useState({
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
            {
                label: 'Rested',
                data: weekData.rest,
                backgroundColor: '#547bc9',
                borderRadius: 2,
            },
            {
                label: 'Worked',
                data: weekData.work,
                backgroundColor: 'rgb(204, 162, 126)',
                borderRadius: 2,
            },
        ],
    });

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            backgroundColor: '#f0f0f0',
            padding: {
                top: 15,
                left: 20, 
                right: 20,
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
                    color: "rgb(204, 162, 126)",
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
                title: {
                    display: true,
                    text: "Hours",
                    padding: {
                        bottom: 10
                    }
                }
            },
        },
    };

    useEffect(() => {
        const getGraphData = async () => {
            try {
                const response = await axios.get("https://task-manager-server-6eht.onrender.com/times/getChartData", {
                    params: {
                        taskId: taskId,
                        periodDates: weekPeriod.getPeriodDatesArray()
                    }
                });
                const { activeData, restData } = response.data;
                setWeekData({
                    rest: restData, 
                    work: activeData
                });
            } catch (error) {
               console.error("GET request error for retrieving graph data", error);
            }
        };
        getGraphData();
    }, [weekPeriod]);

    return(
        <div className="flex flex-col bg-blue-200 bg-opacity-40 rounded-xl w-1/2 shadow-sm" >
            <div className="h-[280px]">
                <Bar
                    redraw={true}
                    data={chartData}
                    options={options}
                />
            </div>
            <WeekNavigator
                weekPeriod={weekPeriod} 
                setWeekPeriod={setWeekPeriod} 
            />
        </div>
    );
};