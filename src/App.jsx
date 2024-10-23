import './styles/TaskManager.css';
import './styles/Calendar.css';

import ControlBar from './components/ControlBar/ControlBar.jsx';
import TasksList from './components/TasksList/TasksList.jsx';
import TaskAddField from './components/TaskAddField.jsx';

import { useState } from 'react';

function App() {
	const [currFolderId, setCurrFolderId] = useState(1);
	const [newTask, setNewTask] = useState();
    const [taskItems, setTaskItems] = useState([]);
    const [searchItems, setSearchItems] = useState([]);
	const [inputting, setInputting] = useState(false);
    // const [folderMode, setFolderMode] = useState(false);

  	return (
		<div className="h-screen w-screen flex flex-col justify-start bg-blue-50">
			<ControlBar setSearchItems={setSearchItems} inputting={inputting} setInputting={setInputting} setTaskItems={setTaskItems} currFolderId={currFolderId} setCurrFolderId={setCurrFolderId} />
			<div className="flex flex-col justify-center h-full" >
				<TasksList searchItems={searchItems} inputting={inputting} taskItems={taskItems} setTaskItems={setTaskItems} currFolderId={currFolderId} newTask={newTask} />
				<TaskAddField currFolderId={currFolderId} setNewTask={setNewTask} />
			</div>
    	</div>
  	);
}

export default App
