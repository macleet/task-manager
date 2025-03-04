import { useEffect, useState } from 'react';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Phase from "./Phase.jsx";
import { getPhases, postGenerateSubtasks } from '../../../utilities/api.js';

export default ({ name, taskId, currentTab }) => {
    const [phases, setPhases] = useState(null); // Stores the phases of the subtask
    const [isLoading, setIsLoading] = useState(false); // Tracks loading state
    const [taskDetails, setTaskDetails] = useState(""); // Stores user input for task details

    const handleDetailsInput = (event) => setTaskDetails(event.target.value);

    const handleInputKeydown = async (event) => {
        if (event.key === "Enter" && taskDetails !== "") {
            await generateSubtasks();
            setTaskDetails(""); // Clear input after generating subtasks
            return;
        }
    };

    useEffect(() => {
        if (isLoading) return; // Skip fetching if already loading

        const retrievePhases = async () => {
            try {
                const { phases } = await getPhases(taskId);
                setPhases(phases); // Update phases state with fetched data
            } catch (error) {
                console.error("Error retrieving phases", error);
            }
        };
        retrievePhases();
    }, [isLoading]); // Fetch phases when `isLoading` changes

    const generateSubtasks = async () => {
        if (taskDetails === "") return; // Prevent empty submissions

        try {
            setIsLoading(true); // Set loading state to true
            await postGenerateSubtasks(taskId, name, taskDetails);
        } catch (error) {
            console.error("Error generating subtasks", error);
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return (
        currentTab === 0 && phases !== null
        ?
        phases.map((phase, index) => 
            <div key={phase.phase_id} className="flex flex-col col-span-full w-full">
                <Phase
                    isOpen={currentTab === 0} 
                    name={phase.phase_name} 
                    description={phase.phase_description}
                    phaseId={phase.phase_id}
                    completed={phase.completed}
                    steps={phase.steps}
                />
                {index === phases.length - 1 || phases.length > 1 && <div className="self-center w-11/12 h-0.5 bg-blue-200" />}
            </div>
        )
        :
        <div className={`${currentTab !== 0 && "hidden"} flex justify-center items-center overflow-hidden transition-all ease-in-out col-span-full w-full`}>
            {!isLoading && 
                <div className="flex flex-col justify-center items-end gap-5 w-4/5 h-32">
                    <input 
                        className="w-full h-8 rounded p-1 px-2" 
                        type="text" 
                        placeholder={`Enter extra task details...`}
                        onKeyDown={handleInputKeydown}
                        onChange={handleDetailsInput}
                        value={taskDetails}
                    />
                    <button
                        onClick={generateSubtasks}
                        className="flex justify-center whitespace-nowrap items-center bg-blue-500 bg-opacity-40 p-3 rounded-md gap-2 text-sm font-medium text-slate-800 hover:scale-105 transition-transform ease-in-out shadow"
                    >
                        <AutoAwesomeIcon style={{width: "18px", height: "18px", color: "#ffffaa"}} />
                        Generate subtasks
                    </button>
                </div>
            }

            {isLoading && 
                <div className="flex justify-center items-center h-32">
                    <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
            }
        </div>
    );
};
