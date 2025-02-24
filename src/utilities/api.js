import axios from 'axios';
import WeekPeriod from './WeekPeriod';

export const getAllFolders = async () => {
    try {
        const response = await axios.get('https://task-manager-server-6eht.onrender.com/folder/');
        return response.data;
    } catch (error) {
        console.error("Error fetching folders", error);
    }
};

export const addNewFolder = async (name) => {
    try {
        const response = await axios.post(`https://task-manager-server-6eht.onrender.com/folder/add/${name}`);
        return response.data.id;
    } catch (error) {
        console.error("Error adding new folder", error);
    }
};

export const changeFolderName = async (folderId, name) => {
    try {
        await axios.patch(`https://task-manager-server-6eht.onrender.com/folder/change/${folderId}`, { name });
    } catch (err) {
        console.error(err.message);
    }
};

export const deleteFolder = async (folderId) => {
    try {
        await axios.delete(`https://task-manager-server-6eht.onrender.com/folder/delete/${folderId}`);
    } catch (error) {
        console.error("Error deleting folder", error);
    }
};

export const getAllTasks = async (currFolderId) => {
    try {
        const response = await axios.get(`https://task-manager-server-6eht.onrender.com/task/getAll/${currFolderId}`);
        return response.data;
    } catch (err) {
        console.error("Error fetching tasks:", err.message);
    }
};

export const getSearchRes = async (query) => {
    try {
        const response = await axios.get('https://task-manager-server-6eht.onrender.com/task/search', {
            params: { search_query: query }, // Send search query to the server
        });
        return response.data;
    } catch (err) {
        console.error(err.message); // Handle errors
    }
};

export const deleteTask = async (taskId) => {
    try {
        await axios.delete("https://task-manager-server-6eht.onrender.com/task/delete", {
            data: { id: taskId }
        });
    } catch(error) {
        console.error(`Error deleting task ${taskId}`, error);
    }
};

export const getActiveTask = async (taskId) => {
    try {
        const response = await axios.get("https://task-manager-server-6eht.onrender.com/times/getActiveTask", {
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
        const response = await axios.get("https://task-manager-server-6eht.onrender.com/times/getActive", {
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
        await axios.patch("https://task-manager-server-6eht.onrender.com/times/setActive", {
            taskId,
            isActive: isChecked
        });
    } catch (error) {
        console.error("Error setting as active task", error);
    }
    
};

export const getActiveDurationText = async (taskId) => {
    try {
        const response = await axios.get("https://task-manager-server-6eht.onrender.com/times/getElapsedMinutes", {
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
        const response = await axios.get("https://task-manager-server-6eht.onrender.com/times/getRestedMinutes", {
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
        await axios.post('https://task-manager-server-6eht.onrender.com/task/add', {
            name,
            folderId
        });
    } catch (err) {
        console.error("Error adding new task", err.message);
    }
};

export const patchName = async (taskId, name) => {
    try {
        await axios.patch(`https://task-manager-server-6eht.onrender.com/task/nameChange/${taskId}`, { newName: name });
    } catch (error) {
        console.error("Error patching name", error);
    }
};

export const patchPriority = async (taskId, priority) => {
    try {
        await axios.patch(`https://task-manager-server-6eht.onrender.com/task/priority`, { 
            taskId,
            newPriority: priority
        });
    } catch (error) {
        console.error("Error patching priority", error);
    }
};

export const patchDueDate = async (taskId, dueDate) => {
    try {
        await axios.patch(`https://task-manager-server-6eht.onrender.com/task/dateChange/${taskId}`, {	
            newDate: dueDate,
        });
    } catch (error) {
        console.error("Error patching due date", error);
    }
};

export const patchNotes = async (taskId) => {
    try {
        await axios.patch("https://task-manager-server-6eht.onrender.com/task/notesChange", {	
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
        await axios.patch("https://task-manager-server-6eht.onrender.com/times/setElapsedMinutes", {
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
        await axios.patch("https://task-manager-server-6eht.onrender.com/times/setRestedMinutes", {
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
        const response = await axios.get("https://task-manager-server-6eht.onrender.com/times/getChartData", {
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
        const respose = await axios.get(`https://task-manager-server-6eht.onrender.com/subtask/phases`, {
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
        await axios.post(`https://task-manager-server-6eht.onrender.com/subtask/generate`, {
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
        await axios.patch("https://task-manager-server-6eht.onrender.com/subtask/completedPhase", {
            phaseId,
            completed
        });
    } catch (error) {
        console.error("Error generating subtasks", error);
    }
};

export const getPhaseSteps = async (phaseId) => {
    try {
        const response = await axios.get("https://task-manager-server-6eht.onrender.com/subtask/steps", {
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
        await axios.patch("https://task-manager-server-6eht.onrender.com/subtask/completedStep", {
            stepId,
            completed
        });
    } catch (error) {
        console.error("Error generating subtasks", error);
    }
};
