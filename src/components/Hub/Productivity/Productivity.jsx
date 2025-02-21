import Stats from "./Stats";
import Chart from "./Chart";

export default ({taskId, currentTab}) => {
    return(
        <div className={`flex justify-center gap-6 w-full p-8 pt-2 ${currentTab !== 1 && "hidden"}`}>
            <Stats taskId={taskId} />
            <Chart taskId={taskId} />
        </div>
    );
};