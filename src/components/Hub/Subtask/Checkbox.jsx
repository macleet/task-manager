export default ({size, isChecked, onChange}) => {
    return(
        <input 
            type="checkbox"
            onChange={onChange}
            checked={isChecked}
            style={{ padding: `${size}px`, width: `${size}px`, height: `${size}px`}}
            className={`cursor-pointer appearance-none border-2 border-blue-700 border-opacity-75 checked:bg-blue-500 checked:border-blue-500 checked:ring-2 checked:ring-blue-300 transition-colors rounded-full`} 
        />
    );
};