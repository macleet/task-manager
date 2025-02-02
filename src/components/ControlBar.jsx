import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import { 
    useRef,
} from 'react';

import axios from 'axios';

const ControlBar = ({ setShowFolder, setSearchItems, searching, setSearching, currHeader }) => {
    const inputRef = useRef(null);

    // Handle the input key press events
    const handleInputSubmit = (event) => {
        if (event.key === "Escape") {
            setSearching(false); // Stop searching on Escape
            inputRef?.current.blur(); // Remove focus from the input field
            return;
        }
        if (inputRef?.current.value === "") {
            setSearchItems([]); // Clear search items if input is empty
            return;
        }

        // Function to fetch search results from the server
        const getSearchRes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/task/search', {
                    params: { search_query: inputRef?.current.value }, // Send search query to the server
                });
                const taskItems = response.data.map((task) => ({
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
            } catch (err) {
                console.error(err.message); // Handle errors
            }
        };
        getSearchRes(); // Call the search API
    };

    // Handle input focus (set searching state to true)
    const handleInputFocus = () => setSearching(true);

    // Handle input blur (set searching state to false)
    const handleInputBlur = () => setSearching(false);

    // Toggle the folder visibility
    const handleClick = () => setShowFolder((prev) => !prev);

    return (
        <div className="flex justify-between items-center gap-2 px-3 py-2 h-fit w-full rounded shadow-sm relative z-10">
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

            <div className="flex justify-end items-center w-1/4">
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
