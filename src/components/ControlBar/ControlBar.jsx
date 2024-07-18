import FolderIcon from '@mui/icons-material/Folder';
import { Collapse } from '@mui/material';

import { useState, useEffect } from 'react';

import axios from 'axios';

import AddInput from './InputFields/AddInput.jsx';
import SearchInput from './InputFields/SearchInput.jsx';
import FoldersBar from './FoldersBar/FoldersBar.jsx';

const ControlBar = ({taskItems, setTaskItems, currFolder, setCurrFolder}) => {
    const [hidden, setHidden] = useState(true);
	const [addInputHidden, setAddInputHidden] = useState(true);
    const [folderItems, setFolderItems] = useState([]);
	const [folderAdded, setFolderAdded] = useState(false);
	const [currHeader, setCurrHeader] = useState("");

	useEffect(() => {
		const getFolderName = async () => {
			try {
				// console.log('****');
				const response = await axios.get(`http://localhost:8000/folder/${currFolder}`);
				// console.log(response.data.name);
				setCurrHeader(response.data.name);
			} catch (err) {
				console.log(err.message);
			}
		};
		getFolderName();
	}, [currFolder]);

    const handleFolderClick = () => {
        setHidden(!hidden);
		setAddInputHidden(true);
    };

	return (
	    <div className="flex flex-col h-fit w-full">
			<div className="flex justify-between items-center w-full mb-4" >
				<div className="flex justify-between items-center w-full" >
					<div className='flex items-center '>
						<FolderIcon onClick={handleFolderClick} fontSize="large" className="text-yellow-500 hover:scale-110 cursor-pointer" />
						<h2 className="text-2xl whitespace-nowrap mx-6 font-semibold text-gray-800 leading-none" >
							{currHeader} 
						</h2>
					</div>
					<div className='w-full flex flex-col items-end'>
						<Collapse className='text-field-collapse' in={!hidden} timeout="auto" mountOnEnter unmountOnExit >
							<AddInput addInputHidden={addInputHidden} setAddInputHidden={setAddInputHidden} setFolderAdded={setFolderAdded} setCurrFolder={setCurrFolder}/>
						</Collapse>
						<Collapse className='text-field-collapse' in={hidden} mountOnEnter unmountOnExit timeout="auto" >
							<SearchInput taskItems={taskItems} setTaskItems={setTaskItems} setCurrFolder={setCurrFolder}/>
						</Collapse>
					</div>
				</div>
			</div>
			<Collapse id='folder-add' in={!hidden} timeout="auto" mountOnEnter unmountOnExit >
				<FoldersBar hidden={hidden} currFolder={currFolder} setCurrFolder={setCurrFolder} setCurrHeader={setCurrHeader} folderAdded={folderAdded} setFolderAdded={setFolderAdded} folderItems={folderItems} setFolderItems={setFolderItems} />
			</Collapse>
	    </div>
	);
}

export default ControlBar;