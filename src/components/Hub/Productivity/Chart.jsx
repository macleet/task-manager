import WeekPeriod from "../../../utilities/WeekPeriod";
import WeekNavigator from "./WeekNavigator";
import { useEffect, useState, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useTimerContext } from "../../../context/TimerContext";
import { getGraphData } from "../../../utilities/api";
import { options, daysLabel, restedDataset, workedDataset } from "../../../constants/chart";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default ({ taskId }) => {
    const chartRef = useRef(null);
    const { paused } = useTimerContext();
    const [weekPeriod, setWeekPeriod] = useState(new WeekPeriod());
    const [chartData, setChartData] = useState({
        labels: daysLabel,
        datasets: []
    });

    const updateGraph = async () => {
        try {
            const { activeData, restData } = await getGraphData(taskId, weekPeriod.getPeriodDatesArray());
            setChartData(prev => ({
                ...prev,
                datasets: [
                    {...restedDataset, data: restData}, 
                    {...workedDataset, data: activeData}
                ]
            }));
            chartRef.current?.update();
        } catch (error) {
            console.error("Error updating graph", error);
        }
    };

    useEffect(() => { updateGraph() }, []);
    useEffect(() => {
        if (!paused) return;
        updateGraph();
    }, [weekPeriod, paused]);

    return(
        <div className="flex flex-col bg-blue-200 bg-opacity-40 rounded-xl w-full shadow-sm" >
            <div className="h-[280px] w-full">
                <Bar
                    ref={chartRef}
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