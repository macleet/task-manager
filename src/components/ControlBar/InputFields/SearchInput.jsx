import { TextField } from '@mui/material';
// import Search from '@mui/icons-material/Search';

const SearchInput = ({taskItems, setTaskItems, setCurrFolder}) => {
	const handleSearch = event => {
		if (!event.target.value) {
			// setTaskItems();
			setCurrFolder(1);
			return;
		}

		const getSearchRes = async query => {
			try {
				const response = await axios.get('http://localhost:8000/task/search', {
					data: {
						"search_query": query
					}
				});
				// console.log('$$$$$$$$$$$$$$$');
				const searchItems = response.data.map(task => <TaskItem key={task.task_id} taskId={task.task_id} description={task.description} />);
				setTaskItems(searchItems);
			} catch (err) {
				console.error(err.message);
			}
		};
		getSearchRes(event.target.value);
	};

	return (
		<div className="flex justify-end items-center w-full" >
			<TextField onKeyUp={handleSearch} className='w-full' autoComplete='off' placeholder="Search task..." size="small" />
		</div>
	);
}

export default SearchInput;
