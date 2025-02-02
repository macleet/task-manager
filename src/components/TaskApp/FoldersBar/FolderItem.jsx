import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from "axios";
import { useState, useRef, useEffect } from 'react';

const FolderItem = ({
    editingId, setEditingId, addFolder, setCurrHeader, setModified, setFolderItems,
    currFolderId, setCurrFolderId, folderId, name, setShowFolder
}) => {
    const inputRef = useRef(null);
    const [folderName, setFolderName] = useState(name);
    const [prevName, setPrevName] = useState(folderName);
    const [editing, setEditing] = useState(false);
    const [hover, setHover] = useState(false);

    // Edit folder name
    const editFolder = async () => {
        try {
            await axios.patch(`http://localhost:8000/folder/change/${folderId}`, { name: inputRef?.current.value });
        } catch (err) {
            console.error(err.message);
        }

        // Update local folder items
        setFolderItems((prevItems) => prevItems.map(({ folder_id, name }) => {
            if (folderId === folder_id) name = inputRef?.current.value;
            return { folder_id, name };
        }));

        // Update current folder header if this folder is selected
        if (currFolderId === folderId) setCurrHeader(inputRef?.current.value);

        setModified((prev) => !prev);
    };

    // Delete folder
    const deleteFolder = async () => {
        try {
            await axios.delete(`http://localhost:8000/folder/delete/${folderId}`);
            setModified((prev) => !prev);
        } catch (err) {
            console.error(err.message);
        }
    };

    // Handle folder selection
    const handleClick = () => {
        if (addFolder || editing || editingId > 0) return;
        setCurrFolderId(folderId);
        setCurrHeader(folderName);
        setShowFolder(false);
    };

    // Handle key actions (Enter to submit, Escape to cancel)
    const handleKeyDown = (event) => {
        switch (event.key) {
            case "Enter":
                editFolder();
                setEditing(false);
                inputRef?.current.blur();
                break;
            case "Escape":
                setFolderName(prevName);
                setEditing(false);
                inputRef?.current.blur();
                break;
        }
    };

    // Handle folder name change
    const handleChange = (event) => setFolderName(event.target.value);

    // Handle hover effect on buttons
    const handleMouseEnter = () => {
        if (!addFolder && (editingId < 0 || editingId === folderId)) setHover(true);
    };
    const handleMouseLeave = () => {
        if (!addFolder && (editingId < 0 || editingId === folderId)) setHover(false);
    };

    // Handle edit button click
    const handleEdit = () => setEditing(!editing);

    // Focus and handle edit state when switching between folder items
    useEffect(() => {
        if (editing) {
            inputRef?.current.focus();
            setPrevName(folderName);
            setEditingId(folderId);
        } else if (editingId > 0) {
            setEditingId(-1);
        } else if (prevName !== inputRef?.current.value) { // Submit if name changed
            editFolder();
            setEditingId(-1);
        }
    }, [editing]);

    return (
        <div
            id={folderId}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`flex items-center w-full h-9 min-h-[36px] pr-2 transition-all
                ${addFolder || (editingId > 0 && editingId !== folderId) ? "opacity-50" : "hover:bg-blue-300 hover:bg-opacity-70"}
                ${currFolderId === folderId ? "bg-blue-300 bg-opacity-70" : "bg-blue-200 bg-opacity-60"}`}
        >
            {/* Folder input field */}
            <input
                id={folderId}
                ref={inputRef}
                value={folderName}
                contentEditable={editing}
                readOnly={!editing}
                autoComplete="false"
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                onClick={handleClick}
                className={`text-slate-800 bg-transparent pl-3 h-full w-full text-sm font-medium outline-none
                    ${addFolder || (editingId > 0 && editingId !== folderId) ? "cursor-default" : editing ? "cursor-text" : "cursor-pointer"}`}
            />
            {/* Edit and Delete buttons */}
            {folderId !== 1 && <div className={`relative z-0 flex gap-0.5 transition-all ${hover ? "opacity-100" : "opacity-0"}`} >
                <button
                    disabled={addFolder || (editingId > 0 && editingId !== folderId)}
                    onClick={handleEdit}
                    className="flex p-1 text-slate-500 text-opacity-60 hover:text-opacity-100 transition-all"
                >
                    <EditIcon fontSize="small" />
                </button>
                <button
                    disabled={addFolder || (editingId > 0 && editingId !== folderId)}
                    onClick={deleteFolder}
                    className="flex p-1 text-slate-500 text-opacity-60 hover:text-opacity-95 transition-all"
                >
                    <DeleteIcon fontSize="small" />
                </button>
            </div>}
        </div>
    );
};

export default FolderItem;
