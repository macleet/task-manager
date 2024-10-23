import Tile from "./Tile";

import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';

import {
    useState,
    useRef,
    useEffect,
} from 'react';

export default () => {
    const itemRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
    ];

    const MAX_LENGTH = 3;
    const [focusList, setFocusList] = useState([]);

    const [addedFocusIndex, setAddedFocusIndex] = useState(-1);

    const handleClickAdd = () => {
        // if (focusList.length >= MAX_LENGTH) return;
        focusList.push("");
        setFocusList([...focusList]);
        setAddedFocusIndex(addedFocusIndex*-1);
        
    };

    const handleClickDelete = (event) => {
        const newList = focusList.filter((focus, index) => event.currentTarget.id !== index.toString());
        console.log(newList)
        setFocusList(newList);
    };

    useEffect(() => {
        if (!itemRefs[focusList.length - 1]) return;
        itemRefs[focusList.length - 1].current.focus();
    }, [addedFocusIndex]);

    const handleKeyDown = (event) => {
    };

    const handleChange = (event) => {
        focusList[event.currentTarget.id] = event.currentTarget.value;
        setFocusList([...focusList]);
    };

    const placeholderTexts = [
        "Primary",
        "Secondary",
        "Tertiary",
    ];

    useEffect(() => {
        console.log(focusList)
    }, [focusList]);

    return(
        <Tile colSpan={2} rowSpan={1} style="justify-between font-medium" >
            <span className="flex items-center text-gray-700 h-fit text-lg" >Current Focus</span>
            <div className="h-5/6 flex flex-col justify-center">
                <div className="flex flex-col gap-5 h-5/6" >
                    {focusList.map((focus, index) => 
                        <div key={index} className="bg-slate-300 h-1/4 p-1 px-3 rounded-lg shadow flex justify-center items-center" >
                            <input value={focus} alt={`${placeholderTexts[index]} focus task`} id={index} onChange={handleChange} placeholder={placeholderTexts[index]} onKeyDown={handleKeyDown} className="bg-inherit rounded w-full p-1" ref={itemRefs[index]} />
                            <button id={index} onClick={handleClickDelete} className="flex justify-center items-center ml-3 text-slate-400 hover:text-slate-500 transition-colors" >
                                <ClearIcon sx={{fontSize: 20}} />
                            </button>
                        </div>
                    )}
                    {focusList.length < MAX_LENGTH && <button onClick={handleClickAdd} className="bg-slate-300 bg-opacity-70 hover:bg-opacity-100 transition-colors h-1/4 p-1 px-2 rounded-lg shadow font-bold text-slate-600 flex justify-center items-center">
                        <AddIcon sx={{fontSize: 22}} />
                    </button>}
                </div>
            </div>
        </Tile>
    );
};
