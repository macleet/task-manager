import { useState } from "react";
import Subtasks from './Subtask/Subtasks.jsx';
import ProductivityChart from "./Productivity/Productivity.jsx";

export default ({taskId, name, hubIsOpen}) => {
    const [currentTab, setCurrentTab] = useState(2);

    const onHubTaskClick = (event) => {
        setCurrentTab(+event.target.value);
    };

    return (
        <div className={`${hubIsOpen ? "h-full" : "h-0"} overflow-hidden flex flex-col justify-start items-start transition-all ease-in-out col-span-full`}> 
            {/* Hub header */}
            <div className="flex gap-3 p-3 px-8" >
                <button 
                    value={0}
                    onClick={onHubTaskClick}
                    className={`${currentTab === 0 ? "text-slate-700" : "text-slate-400"} text-lg transition-all ease-in-out`}
                >
                    Subtask Generation
                </button>
                <p className="font-bold text-lg" >·</p>
                <button 
                    value={1}
                    onClick={onHubTaskClick}
                    className={`${currentTab === 1 ? "text-slate-700" : "text-slate-400"} text-lg transition-all ease-in-out`}
                >
                    Productivity
                </button>
                <p className="font-bold text-lg" >·</p>
                <button 
                    value={2} 
                    onClick={onHubTaskClick}
                    className={`${currentTab === 2 ? "text-slate-700" : "text-slate-400"} text-lg transition-all ease-in-out`}
                >
                    Tab Management
                </button>
            </div>

            {/* Hub Features */}
            <Subtasks name={name} taskId={taskId} currentTab={currentTab} />
            <ProductivityChart taskId={taskId} currentTab={currentTab} />
        </div>
    );
};