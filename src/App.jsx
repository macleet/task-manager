import './styles/TaskManager.css';
import './styles/Calendar.css';

import ControlBar from './components/ControlBar.jsx';
import TasksList from './components/TasksList.jsx';
import FoldersBar from "./components/FoldersBar/FoldersBar.jsx";
import { useState } from 'react';

function App() {
    // State hooks to manage task data, search functionality, folder display, and current state
    const [taskItems, setTaskItems] = useState([]);  		// Stores tasks
    const [searchItems, setSearchItems] = useState([]);  	// Stores search results
    const [searching, setSearching] = useState(false);  	// Indicates if a search is active
    const [currHeader, setCurrHeader] = useState("Main");  	// Current header for UI (e.g., Main, Search)
    const [currFolderId, setCurrFolderId] = useState(1);  	// Current selected folder ID
    const [showFolder, setShowFolder] = useState(false);  	// Controls the visibility of the folders bar

    return (
        <div className="flex flex-col bg-blue-50 bg-opacity-50 h-screen w-screen">
            {/* Control bar that contains search and folder controls */}
            <ControlBar
                currHeader={currHeader}
                setTaskItems={setTaskItems}
                setSearchItems={setSearchItems}
                setShowFolder={setShowFolder}
                currFolderId={currFolderId}
                setCurrFolderId={setCurrFolderId}
                searching={searching}
                setSearching={setSearching}
            />
            {/* Main content area with two sections: Folders and Tasks */}
            <div className="flex h-full overflow-auto">
                {/* Folders bar for selecting and toggling folder visibility */}
                <FoldersBar
                    setCurrHeader={setCurrHeader}
                    showFolder={showFolder}
                    setShowFolder={setShowFolder}
                    currFolderId={currFolderId}
                    setCurrFolderId={setCurrFolderId}
                />
                {/* Task list displays tasks based on folder selection or search */}
                <TasksList
                    searchItems={searchItems}
                    searching={searching}
                    currFolderId={currFolderId}
                    showFolder={showFolder}
                    taskItems={taskItems}
                    setTaskItems={setTaskItems}
                />
            </div>
        </div>
    );
}

export default App;
