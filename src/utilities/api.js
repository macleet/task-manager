import axios from 'axios';
import WeekPeriod from './WeekPeriod';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const getAllFolders = async () => {
    try {
        const response = await axios.get(`${baseUrl}/folder/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching folders", error);
    }
};

export const addNewFolder = async (name) => {
    try {
        const response = await axios.post(`${baseUrl}/folder/add/${name}`);
        return response.data.id;
    } catch (error) {
        console.error("Error adding new folder", error);
    }
};

export const changeFolderName = async (folderId, name) => {
    try {
        await axios.patch(`${baseUrl}/folder/change/${folderId}`, { name });
    } catch (err) {
        console.error(err.message);
    }
};

export const deleteFolder = async (folderId) => {
    try {
        await axios.delete(`${baseUrl}/folder/delete/${folderId}`);
    } catch (error) {
        console.error("Error deleting folder", error);
    }
};

export const getAllTasks = async (currFolderId) => {
    try {
        const response = await axios.get(`${baseUrl}/task/getAll/${currFolderId}`);
        return response.data;
    } catch (err) {
        console.error("Error fetching tasks:", err.message);
    }
};

export const getSearchRes = async (query) => {
    try {
        const response = await axios.get(`${baseUrl}/task/search`, {
            params: { search_query: query },
        });
        return response.data;
    } catch (err) {
        console.error(err.message);
    }
};

export const deleteTask = async (taskId) => {
    try {
        await axios.delete(`${baseUrl}/task/delete`, {
            data: { id: taskId }
        });
    } catch(error) {
        console.error(`Error deleting task ${taskId}`, error);
    }
};

export const getActiveTask = async (taskId) => {
    try {
        const response = await axios.get(`${baseUrl}/times/getActiveTask`, {
            params: {
                taskId
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error retrieving (GET) active task info", error);
    }
    return null;
};

export const getIsActive = async (taskId) => {
    try {
        const response = await axios.get(`${baseUrl}/times/getActive`, {
            params: {
                taskId
            }
        });
        return response.data.active;
    } catch (error) {
        console.error("Error fetching current active task", error);
    }
};

export const patchIsActive = async (taskId, isChecked) => {
    try {
        await axios.patch(`${baseUrl}/times/setActive`, {
            taskId,
            isActive: isChecked
        });
    } catch (error) {
        console.error("Error setting as active task", error);
    }
    
};

export const getActiveDurationText = async (taskId) => {
    try {
        const response = await axios.get(`${baseUrl}/times/getElapsedMinutes`, {
            params: {
                taskId
            }
        });
        return response.data.durationText;
    } catch (error) {
        console.error("Error getting elapsed minutes", error);
    }
};

export const getRestedDurationText = async (taskId) => {
    try {
        const response = await axios.get(`${baseUrl}/times/getRestedMinutes`, {
            params: {
                taskId
            }
        });
        return response.data.durationText;
    } catch (error) {
        console.error("Error fetching rested time", error);
    }
};

export const postTask = async (name, folderId) => {
    try {
        await axios.post(`${baseUrl}/task/add`, {
            name,
            folderId
        });
    } catch (err) {
        console.error("Error adding new task", err.message);
    }
};

export const patchName = async (taskId, name) => {
    try {
        await axios.patch(`${baseUrl}/task/nameChange/${taskId}`, { newName: name });
    } catch (error) {
        console.error("Error patching name", error);
    }
};

export const patchPriority = async (taskId, priority) => {
    try {
        await axios.patch(`${baseUrl}/task/priority`, { 
            taskId,
            newPriority: priority
        });
    } catch (error) {
        console.error("Error patching priority", error);
    }
};

export const patchDueDate = async (taskId, dueDate) => {
    try {
        await axios.patch(`${baseUrl}/task/dateChange/${taskId}`, {	
            newDate: dueDate,
        });
    } catch (error) {
        console.error("Error patching due date", error);
    }
};

export const patchNotes = async (taskId, notes) => {
    try {
        await axios.patch(`${baseUrl}/task/notesChange`, {	
            taskId,
            notes
        });
    } catch (error) {
        console.error("Error patching notes", error);
    }
};

export const setElapsedMinutes = async (taskId, elapsedMinutes) => {
    const currentDate = WeekPeriod.getCurrentLocalISO();
    try {
        await axios.patch(`${baseUrl}/times/setElapsedMinutes`, {
            taskId,
            currentDate,
            elapsedTime: elapsedMinutes
        });
    } catch (error) {
        console.error("Error sending patch request to set elapsed minutes", error);
    }
};

export const setRestedMinutes = async (taskId, elapsedMinutes) => {
    const currentDate = WeekPeriod.getCurrentLocalISO();
    try {
        await axios.patch(`${baseUrl}/times/setRestedMinutes`, {
            taskId,
            currentDate,
            elapsedTime: elapsedMinutes
        });
    } catch (error) {
        console.error("Error sending patch request to set rested minutes", error);
    }
};

export const getGraphData = async (taskId, periodDates) => {
    try {
        const response = await axios.get(`${baseUrl}/times/getChartData`, {
            params: {
                taskId,
                periodDates
            }
        });
        return response.data;
    } catch (error) {
       console.error("GET request error for retrieving graph data", error);
    }
}

export const getPhases = async (taskId) => {
    try {
        const respose = await axios.get(`${baseUrl}/subtask/phases`, {
            params: {
                taskId
            }
        });
        return respose.data;
    } catch (error) {
        console.error("Error fetching phases", error);
    }
};

export const postGenerateSubtasks = async (taskId, taskName, taskDetails) => {
    try {
        await axios.post(`${baseUrl}/subtask/generate`, {
            taskId,
            taskName,
            taskDetails
        });
    } catch (error) {
        console.error("Error generating subtasks", error);
    }
};

export const patchPhaseCompleted = async (phaseId, completed) => {
    try {
        await axios.patch(`${baseUrl}/subtask/completedPhase`, {
            phaseId,
            completed
        });
    } catch (error) {
        console.error("Error generating subtasks", error);
    }
};

export const getPhaseSteps = async (phaseId) => {
    try {
        const response = await axios.get(`${baseUrl}/subtask/steps`, {
            params: {
                phaseId
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error generating subtasks", error);
    }
};

export const patchStepCompleted = async (stepId, completed) => {
    try {
        await axios.patch(`${baseUrl}/subtask/completedStep`, {
            stepId,
            completed
        });
    } catch (error) {
        console.error("Error generating subtasks", error);
    }
};
