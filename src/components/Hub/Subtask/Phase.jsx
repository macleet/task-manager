import { useEffect, useState } from 'react';
import Checkbox from './Checkbox.jsx';
import Step from './Step.jsx';
import { getPhases, getPhaseSteps, patchPhaseCompleted } from '../../../utilities/api.js';

export default ({ phaseId, name, description, completed, isOpen, steps }) => {
    // State to manage the steps of the phase
    const [phaseSteps, setPhaseSteps] = useState(steps);
    // State to track whether the phase is completed
    const [complete, setComplete] = useState(completed);

    // Handler for checkbox change to update phase completion status
    const handleOnChange = async (event) => {
        setComplete(event.target.checked);
        await patchPhaseCompleted(phaseId, event.target.checked)
    };

    // Fetch steps for the phase when the component mounts
    useEffect(() => {
        const getSteps = async () => {
            const { steps } = await getPhaseSteps(phaseId);
            steps && setPhaseSteps(steps); // Update steps state if data is retrieved
        };
        getSteps();
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <div className={`flex flex-col px-8 py-4 w-full gap-5 ${!isOpen && "invisible"}`}>
            {/* Phase details */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Checkbox onChange={handleOnChange} isChecked={complete} size={6} />
                    <p className="text-lg leading-none font-medium">{name}</p>
                </div>
                <p className="ml-6 text-base leading-none">{description}</p>
            </div>

            {/* Steps list */}
            <div className="flex flex-col gap-4 ml-8">
                {phaseSteps && phaseSteps.map((step) => (
                    <Step
                        key={step.step_id}
                        stepId={step.step_id}
                        name={step.step_name}
                        description={step.step_description}
                        completed={step.completed}
                    />
                ))}
            </div>
        </div>
    );
};