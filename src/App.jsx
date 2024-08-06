import './styles/TaskManager.css';
import './styles/Calendar.css';

import Header from './components/Header.jsx';
import ControlBar from './components/ControlBar/ControlBar.jsx';
import TasksList from './components/TasksList/TasksList.jsx';
import TaskAddField from './components/TaskAddField.jsx';

import { TaskList } from './utilities/TaskList.js';

import { useState } from 'react';

function App() {
    const [currFolderId, setCurrFolderId] = useState(1);
	const [newTask, setNewTask] = useState();
    const [taskItems, setTaskItems] = useState([]);

  	return (
		<div className="h-screen w-screen bg-blue-100 flex flex-col gap-3 justify-between p-6">
			<Header />
			<ControlBar currFolderId={currFolderId} setCurrFolderId={setCurrFolderId} />
			<TasksList taskItems={taskItems} setTaskItems={setTaskItems} currFolderId={currFolderId} newTask={newTask} />
			<TaskAddField currFolderId={currFolderId} setNewTask={setNewTask} />
    	</div>
  	);
}

export default App
