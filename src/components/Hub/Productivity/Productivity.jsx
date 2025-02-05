import Timer from "./Timer";
import Stats from "./Stats";
import Chart from "./Chart";

export default ({taskId, currentTab}) => {
    return(
        <div className={`flex justify-between gap-6 w-full p-8 pt-2 ${currentTab !== 1 && "hidden"}`}>
            <div className="flex w-3/5 h-full gap-6">
                <Timer />
                <Stats />
            </div>
            <Chart />
        </div>
    );
};