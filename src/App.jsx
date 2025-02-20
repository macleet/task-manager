import './styles/TaskManager.css';
import './styles/Calendar.css';

import ControlBar from './components/ControlBar.jsx';
import TasksList from './components/TasksList.jsx';
import FoldersBar from "./components/FoldersBar/FoldersBar.jsx";
import { useState } from 'react';
import { ActiveTaskProvider } from './context/ActiveTaskContext.jsx';

function App() {
    // State hooks to manage task data, search functionality, folder display, and current state
    const [taskItems, setTaskItems] = useState([]);  		// Stores tasks
    const [currFolderId, setCurrFolderId] = useState(1);  	// Current selected folder ID
    const [currHeader, setCurrHeader] = useState("Main");  	// Current header for UI (e.g., Main, Search)
    const [searchItems, setSearchItems] = useState([]);  	// Stores search results
    const [searching, setSearching] = useState(false);  	// Indicates if a search is active
    const [showFolder, setShowFolder] = useState(false);  	// Controls the visibility of the folders bar

    return (
        <div className="flex flex-col bg-blue-50 bg-opacity-50 h-screen w-screen">
            <ActiveTaskProvider>
                {/* Control bar that contains search and folder controls */}
                <ControlBar
                    currHeader={currHeader}
                    setTaskItems={setTaskItems}
                    currFolderId={currFolderId}
                    setCurrFolderId={setCurrFolderId}
                    setShowFolder={setShowFolder}
                    searching={searching}
                    setSearching={setSearching}
                    setSearchItems={setSearchItems}
                />
                {/* Main content area with two sections: Folders and Tasks */}
                <div className="flex h-full overflow-auto">
                    {/* Folders bar for selecting and toggling folder visibility */}
                    <FoldersBar
                        setCurrHeader={setCurrHeader}
                        currFolderId={currFolderId}
                        setCurrFolderId={setCurrFolderId}
                        showFolder={showFolder}
                        setShowFolder={setShowFolder}
                    />
                    {/* Task list displays tasks based on folder selection or search */}
                    <TasksList
                        currFolderId={currFolderId}
                        taskItems={taskItems}
                        setTaskItems={setTaskItems}
                        searchItems={searchItems}
                        searching={searching}
                        showFolder={showFolder}
                    />
                </div>
            </ActiveTaskProvider>
        </div>
    );
}

export default App;
