import './styles/TaskManager.css';
import './styles/Calendar.css';

import Header from './components/Header.jsx';
import ControlBar from './components/ControlBar/ControlBar.jsx';
import TasksList from './components/TasksList/TasksList.jsx';
import TaskAddField from './components/TaskAddField.jsx';

import { useState } from 'react';

function App() {
	const [currFolder, setCurrFolder] = useState(1);
	const [newTask, setNewTask] = useState();
    const [taskItems, setTaskItems] = useState([]);

  	return (
		<div className="h-screen w-screen px-8 sm:px-12 md:px-20 lg:px-20 py-12 bg-blue-100 flex flex-col justify-between">
			<Header />
			<main className="h-5/6 w-full flex flex-col justify-evenly">
				<ControlBar taskItems={taskItems} setTaskItems={setTaskItems} currFolder={currFolder} setCurrFolder={setCurrFolder} />
				<TasksList taskItems={taskItems} setTaskItems={setTaskItems} currFolder={currFolder} newTask={newTask} />
                <TaskAddField currFolder={currFolder} setNewTask={setNewTask} />
			</main>
    	</div>
  	);
}

export default App
