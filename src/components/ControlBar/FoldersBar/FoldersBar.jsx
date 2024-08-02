import { useState, useEffect } from 'react';

import FolderItem from './FolderItem';

import axios from 'axios';

const FoldersBar = ({hidden, currFolder, setCurrFolder, setCurrHeader, folderAdded, setFolderAdded, folderItems, setFolderItems}) => {
	const [currId, setCurrId] = useState();
	const [folderDeleted, setFolderDeleted] = useState(false);

	const initStyle = "text-orange-900 h-fit min-w-min w-36 bg-orange-400 hover:bg-amber-500 p-4 flex flex-col justify-between items-center rounded-full shadow-md transition-colors cursor-pointer";
	// const highlightStyle = "text-orange-900 h-fit min-w-min w-36 bg-orange-400 hover:bg-amber-500 mx-2 my-4 p-4 flex flex-col justify-between items-center rounded-full shadow-md transition-colors cursor-pointer border-4 border-solid border-amber-600";

    useEffect(() => {
        const getFolders = async () => {
            const folders = await axios.get('http://localhost:8000/folder/');
            const folderItems = folders.data.map(folder => <FolderItem currFolder={currFolder} setCurrFolder={setCurrFolder} setCurrHeader={setCurrHeader} key={folder.folder_id} folderId={folder.folder_id} name={folder.name} setFolderDeleted={setFolderDeleted} currId={currId} setCurrId={setCurrId} itemStyle={initStyle} />);

            setFolderItems(folderItems);
			setFolderAdded(false);
			setFolderDeleted(false);
        };
        getFolders();
    }, [hidden, folderAdded, folderDeleted]);

	// useEffect(() => {
	// 	folderItems.forEach(folItem => {
	// 		if (folItem.key != currId) {
	// 			console.log(folItem.key);
	// 		}	
	// 	});
	// }, [currId]);

	return (
		<div className='overflow-y-auto w-full py-2'>
			<div className="overflow-y-auto flex items-center w-full h-fit bg-orange-200 rounded-full p-3 shadow-md folders">
				{folderItems}
			</div>
		</div>
	);
};

export default FoldersBar;