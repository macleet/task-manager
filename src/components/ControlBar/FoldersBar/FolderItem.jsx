import FolderButtons from "./FolderButtons";

const FolderItem = ({currFolder, setCurrFolder, setCurrHeader, folderId, name, setFolderDeleted, currId, setCurrId, itemStyle}) => {
    const handleClick = event => {
		console.log(folderId);	
		setCurrFolder(folderId);	// Sets header displaying folder name
		setCurrId(event.currentTarget.id);
    };

	return (
		folderId === 1 ? 
		<div onClick={handleClick} id={1} className="text-orange-900 w-24 h-max bg-orange-400 hover:bg-amber-500 mx-2 p-3 flex flex-col justify-between items-center rounded-full shadow-md transition-colors cursor-pointer">
			<input id={1} className="text-lg text-center font-bold h-full max-w-full bg-inherit rounded-full outline-none cursor-pointer" defaultValue={name} readOnly />
			<div className="mt-2 opacity-50" >
				<i className="fa-solid fa-lock" />
			</div>
		</div> :
		<div onClick={handleClick} id={folderId} className={itemStyle} >
			<input id={folderId} className="text-lg min-w-full w-36 text-center font-bold bg-inherit rounded-full outline-none cursor-pointer" defaultValue={name} readOnly />
			<FolderButtons id={folderId} folderId={folderId} setCurrFolder={setCurrFolder} setFolderDeleted={setFolderDeleted} />
		</div>
	);
};

export default FolderItem;
