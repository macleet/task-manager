const FolderButtons = ({folderId, setCurrFolder, setFolderDeleted}) => {
	const handleDelete = () => {
		const deleteTask = async () => {
			try {
				await axios.delete(`http://localhost:8000/folder/delete/${folderId}`);
				setFolderDeleted(true);
				setCurrFolder(1);
			} catch (err) {
				console.error(err.message);
			}
		};
		deleteTask();
	};

	return (
		<div className="text-amber-800 flex justify-evenly w-full mt-2">
    	    <button className="hover:text-orange-600">
    	        <i className="fa-pen-to-square fa-regular fa-lg" ></i>
    	    </button>
    	    <button onClick={handleDelete} className="hover:text-red-600">
    	        <i className="fa-trash fa-solid fa-lg" ></i>
    	    </button>
		</div>
	);
};

export default FolderButtons;
