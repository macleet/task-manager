import Checkbox from './Checkbox.jsx';
import { useState } from 'react';
import axios from 'axios';

export default ({ stepId, name, description, completed }) => {
    // State to track whether the step is completed
    const [complete, setComplete] = useState(completed);

    // Handler for checkbox change to update step completion status
    const handleOnChange = async (event) => {
        try {
            setComplete(event.target.checked); // Update local state
            await axios.patch("http://localhost:3000/subtask/completedStep", {
                stepId: stepId,
                completed: event.target.checked // Send updated completion status to the server
            });
        } catch (error) {
            console.error("Error patching completed property", error);
        }
    };

    return (
        <div className="flex flex-col w-full gap-2">
            {/* Step name and checkbox */}
            <div className="flex items-center gap-3">
                <Checkbox onChange={handleOnChange} isChecked={complete} size={4} />
                <p className="font-medium leading-none">{name}</p>
            </div>
            {/* Step description */}
            <p className="ml-6 leading-none">{description}</p>
        </div>
    );
};
