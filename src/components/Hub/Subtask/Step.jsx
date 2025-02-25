import Checkbox from './Checkbox.jsx';
import { useState } from 'react';
import { patchStepCompleted } from '../../../utilities/api.js';

export default ({ stepId, name, description, completed }) => {
    // State to track whether the step is completed
    const [complete, setComplete] = useState(completed);

    // Handler for checkbox change to update step completion status
    const handleOnChange = async (event) => {
        const isChecked = event.target.checked
        setComplete(isChecked); // Update local state
        await patchStepCompleted(stepId, event.target.checked);
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
