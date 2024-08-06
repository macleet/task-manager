import pool from './db.js';
import { Router } from 'express';
const taskRouter = Router();

// Create a task
taskRouter.post('/add', async (req, res) => {
    console.log("Add a task");
    try {
        const { description, date, priority, folder } = req.body;
        const newTask = await pool.query('INSERT INTO tasks (description, due_date, priority, folder_id) VALUES ($1, $2, $3, $4) RETURNING *', [description, date, priority, folder]);
        
        res.json(newTask.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Delete all tasks
taskRouter.delete('/delete/all', async (req, res) => {
    console.log('Remove all tasks');
    try {
        await pool.query('TRUNCATE tasks');
        await pool.query("DELETE FROM folders WHERE NOT name = 'Main'");
        res.json();
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a task
taskRouter.delete('/delete/:id', async (req, res) => {
    console.log('Remove task');
    try {
        const { id } = req.params;
        const folder = await pool.query('SELECT folder_id FROM tasks WHERE task_id = $1', [id]);   // Folder of task to be deleted
        await pool.query('DELETE FROM tasks WHERE task_id = $1 RETURNING *', [id]);     // Delete task from folder

        // Check if deleted task is last of folder
        const delFolder = folder.rows[0].folder;
        const folderEmpty = async () => {
            const folders = await pool.query('SELECT * FROM tasks WHERE folder_id = $1', [delFolder]);
            return folders ? false : true;
        }
        if (folderEmpty()) {
            await pool.query("DELETE FROM folders WHERE name = $1 AND NOT name = 'Main'", [delFolder]);     // Delete empty folder
        }

        res.json(folder.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// Search
taskRouter.get('/search', async (req, res) => {
    console.log('Search for task');
    try {
        const {search_query} = req.query;
        console.log(search_query);
        const results = await pool.query('SELECT * FROM tasks WHERE description ILIKE $1', [`%${search_query}%`]);
        res.json(results.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get all tasks from folder
taskRouter.get('/getAll/:folder', async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM tasks WHERE folder_id ILIKE $1 ORDER BY priority DESC, task_id', [req.params.folder]);
        res.json(results.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get a task from folder
taskRouter.get('/get/:id', async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM tasks WHERE task_id = $1', [req.params.id]);
        res.json(results.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Toggle priority
taskRouter.put('/priority/:id', async (req, res) => {
    try {
       await pool.query('UPDATE tasks SET priority = NOT priority WHERE task_id = $1', [req.params.id]);
        res.json();
    } catch (err) {
        console.error(err.message);
    }
});

// Update a task description
taskRouter.put('/update/:id', async (req, res) => {
    try {
        const newText = req.body["new_description"];
        const result = await pool.query('UPDATE tasks SET description = $1 WHERE task_id = $2 RETURNING *', [newText, req.params.id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Change task's folder
taskRouter.put('/move/:id', async (req, res) => {
    try {
        const { folder } = req.body;
        await pool.query('UPDATE tasks SET folder = $1 WHERE task_id = $2 RETURNING *', [folder, req.params.id]);
        res.json();
    } catch (err) {
        console.error(err.message);
    }
});

taskRouter.get('/dueDate/:id', async (req, res) => {
    try {
        const results = await pool.query('SELECT due_date FROM tasks WHERE task_id = $1', [req.params.id]);
        res.json(results.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Change due date
taskRouter.put('/dateChange/:id', async (req, res) => {
    try {
        const newDate = req.body["new_date"];
        const result = await pool.query('UPDATE tasks SET due_date = $1 WHERE task_id = $2 RETURNING *', [newDate, req.params.id]);  // pg BUG? date behavior odd hence bracket access
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
    }
});

export default taskRouter;
