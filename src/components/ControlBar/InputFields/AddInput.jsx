import { TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddInput = ({addInputHidden, setAddInputHidden, setFolderAdded, setCurrFolder}) => {
	const handleFolderAdd = () => {
		setAddInputHidden(!addInputHidden);
	};

	const handleFolderEnter = event => {
		if(event.key !== 'Enter' || event.target.value === '') {
			return;
		}

		const addFolder = async name => {
			try {
				const folder_id = await axios.post(`http://localhost:8000/folder/add/${name}`);
				setFolderAdded(true);
				setCurrFolder(folder_id.data.id.rows[0].folder_id);
			} catch (err) {
				console.error(err.message);
			}
		};
		addFolder(event.target.value);
		// setCurrFolder(event.target.value);
		event.target.value = '';
		setAddInputHidden(true);
	};

	return (
		<div className='w-full flex items-center justify-end' >
			<TextField autoComplete='off' onKeyDown={handleFolderEnter} placeholder="Enter new folder..." size="small" className="w-full" />
			<AddIcon onClick={handleFolderAdd} className="cursor-pointer ml-2" />
		</div>
	);
};

export default AddInput;