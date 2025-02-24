import { useState, useEffect, useRef } from 'react';
import FolderItem from './FolderItem';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { addNewFolder, getAllFolders } from '../../utilities/api';

const FoldersBar = ({ setCurrHeader, currFolderId, setCurrFolderId, showFolder, setShowFolder }) => {
    const [folderItems, setFolderItems] = useState([]);
    const [editingId, setEditingId] = useState(-1);
    const [modified, setModified] = useState(false);
    const [addFolder, setAddFolder] = useState(false); // TODO change to addFolderId default -1
    const inputRef = useRef(null);

    // Fetch folder items from the server
    useEffect(() => {
        const getFoldersFromApi = async () => {
            const folders = await getAllFolders();
            setFolderItems(folders);
        };
        getFoldersFromApi();
    }, [modified]);

    // Handle adding new folder
    const handleClickAdd = () => setAddFolder(!addFolder);

    // Focus on the input field when adding a new folder
    useEffect(() => {
        if (addFolder) {
            inputRef.current?.focus();
        }
    }, [addFolder]);

    // Handle form submission for new folder
    const handleSubmit = async () => {
        if (inputRef.current?.value === "") {
            setAddFolder(false);
            return;
        }
        const folderId = await addNewFolder(inputRef.current.value);
        setCurrFolderId(folderId);
        setCurrHeader(inputRef.current.value);
        setModified(!modified);
        setAddFolder(false);
    };

    // Handle keyboard actions (Enter to submit, Escape to cancel)
    const handleKeyDown = (event) => {
        switch (event.key) {
            case "Enter":
                handleSubmit();
                break;
            case "Escape":
                setAddFolder(false);
                break;
        }
    };

    return (
        <div className={`flex flex-col from-blue-100 to-blue-50 bg-gradient-to-tr to-75% transition-all ${showFolder ? "w-1/5" : "w-0"}`}>
            {/* Header section */}
            <div className="flex justify-between items-center px-3 py-2">
                <h3 className="flex text-sm font-medium text-slate-800">Folders</h3>
                <button
                    disabled={editingId > 0}
                    onClick={handleClickAdd}
                    className={`flex transition-all ${editingId > 0 && "opacity-0"} ${addFolder ? "text-red-500 hover:text-red-500 text-opacity-70 hover:text-opacity-70 rotate-45" : "text-slate-600 hover:text-slate-800 text-opacity-70 hover:text-opacity-75"}`}
                >
                    <AddIcon fontSize="small" />
                </button>
            </div>

            {/* Folder items */}
            <div className="flex flex-col gap-0.5 overflow-y-auto scroll-small">
                {folderItems.map((folder, index) => (
                    <FolderItem
                        key={folder.folder_id}
                        folderIndex={index}
                        folderId={folder.folder_id}
                        name={folder.name}
                        addFolder={addFolder}
                        setModified={setModified}
                        setFolderItems={setFolderItems}
                        setShowFolder={setShowFolder}
                        setCurrHeader={setCurrHeader}
                        editingId={editingId}
                        setEditingId={setEditingId}
                        currFolderId={currFolderId}
                        setCurrFolderId={setCurrFolderId}
                    />
                ))}

                {/* Add new folder input */}
                {addFolder && (
                    <div className="flex justify-between px-2 items-center w-full h-9 min-h-[36px] bg-blue-200 bg-opacity-95 transition-all">
                        <input
                            onKeyDown={handleKeyDown}
                            ref={inputRef}
                            placeholder="New folder"
                            className="text-slate-800 bg-transparent px-2 h-full w-full text-sm font-medium outline-none"
                        />
                        <button
                            onClick={handleSubmit}
                            className="flex rounded-md p-0.5 text-slate-100 bg-slate-500 hover:bg-slate-600 hover:bg-opacity-95 transition-all"
                        >
                            <CheckIcon sx={{ width: "16px", height: "16px" }} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FoldersBar;
