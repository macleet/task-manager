import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';

export default () => {
    return(
        <div className="flex w-1/5 flex-col gap-6" >
            <div className="w-full flex flex-col justify-between py-2 px-3 bg-blue-200 bg-opacity-40 h-1/2 rounded-xl shadow-sm">
                <div className="h-fit w-fit" >
                    <WorkHistoryIcon sx={{ fontSize: 40, color: "rgb(220 150 90)" }} />
                </div>
                <div className="flex justify-between items-end " >
                    <span>Worked</span>
                    <span><span className="text-lg">0</span> hrs</span>
                </div>
            </div>

            <div className="w-full flex flex-col justify-between py-2 px-3 bg-blue-200 bg-opacity-40 h-1/2 rounded-xl shadow-sm">
                <div className="h-1/2 w-fit" >
                    <SelfImprovementIcon sx={{ fontSize: 44, color: "rgb(59 150 246)" }} />
                </div>
                <div className="flex justify-between items-end" >
                    <span>Rested</span>
                    <span><span className="text-lg">0</span> hrs</span>
                </div>
            </div>
        </div>
    );
};