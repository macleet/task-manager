import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccessAlarmRoundedIcon from '@mui/icons-material/AccessAlarmRounded';
import Timer from "./Timer";
import { getSearchRes } from '../utilities/api';

import { 
    useRef,
    useState
} from 'react';

const ControlBar = ({ setShowFolder, setSearchItems, searching, setSearching, currHeader }) => {
    const inputRef = useRef(null);
    const [timerIsOpen, setTimerIsOpen] = useState(false);

    // Handle the input key press events
    const handleInputSubmit = async (event) => {
        if (event.key === "Escape") {
            setSearching(false); // Stop searching on Escape
            inputRef?.current.blur(); // Remove focus from the input field
            return;
        }

        if (inputRef?.current.value === "") {
            setSearchItems([]); // Clear search items if input is empty
            return;
        }

        try {
            const searchedTasks = await getSearchRes(inputRef?.current.value); // Call the search API
            const taskItems = searchedTasks.map((task) => ({
                taskId: task.task_id,
                name: task.name,
                dueDate: task.due_date ? task.due_date.split("T")[0].replaceAll("-", "/") : null,
                priority: task.priority,
                folderId: task.folder_id,
                notes: task.notes,
                activeSeconds: task.active_seconds,
                tags: task.tags,
            }));
            setSearchItems(taskItems); // Update search results in state
        } catch (error) {
            console.error("Error setting searched tasks", error);
        }

    };

    // Handle input focus (set searching state to true)
    const handleInputFocus = () => setSearching(true);

    // Handle input blur (set searching state to false)
    const handleInputBlur = () => setSearching(false);

    // Toggle the folder visibility
    const handleClick = () => setShowFolder((prev) => !prev);

    // Toggle timer open
    const toggleTimer = () => setTimerIsOpen((prev) => !prev);

    return (
        <div className="flex justify-between items-center gap-2 px-3 py-2 h-fit w-full rounded shadow-sm">
            <div className="flex">
                {/* Toggle menu button */}
                <button onClick={handleClick} className="flex justify-center items-center mr-5 text-slate-600 hover:text-slate-800 transition-colors">
                    <MenuIcon />
                </button>
                
                {/* Header text: changes based on whether searching */}
                <h2 className="flex items-center text-2xl whitespace-nowrap font-semibold text-slate-800">
                    {searching ? "Search" : currHeader}
                </h2>
            </div>

            <div className="flex justify-end items-center w-1/4 gap-4">
                <div className="relative z-50" >
                    <button onClick={toggleTimer} >
                        <AccessAlarmRoundedIcon style={{color: "#475569"}} />
                    </button>
                    <div className={`absolute flex right-0 gap-6 ${!timerIsOpen && "hidden"}`}>
                        <Timer />
                    </div>
                </div>
                {/* Search input field */}
                <input
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onKeyUp={handleInputSubmit}
                    ref={inputRef}
                    className="bg-[#f5f5f5] flex border-2 border-gray-400 outline-none focus:border-gray-700 border-opacity-90 w-full transition-all p-1 px-2 rounded-md"
                    placeholder="Search tasks"
                />
                <div className={`absolute flex transition-all py-1 px-2 ${searching ? "text-gray-700" : "text-gray-400"}`}>
                    <SearchIcon />
                </div>
            </div>
        </div>
    );
}

export default ControlBar;
