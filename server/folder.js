import pool from './db.js';
import { Router } from 'express';
const folderRouter = Router();

// Get all folders
folderRouter.get('/', async (req, res) => {
    try {
        const folders = await pool.query('SELECT * FROM folders');
        res.json(folders.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get folder name from folder id
folderRouter.get('/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT name FROM folders WHERE folder_id = $1', [req.params.id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error("get folder name error: ", err.message);
    }
});

// Add folder
folderRouter.post('/add/:name', async (req, res) => {
    try {
        const fid = await pool.query('INSERT INTO folders (name) VALUES ($1)  RETURNING folder_id', [req.params.name]);
        res.json({ id: fid });
    } catch (err) {
        console.error("add folder error: ", err.message)
    }
});

// Change folder name
folderRouter.put('/change/:id', async (req, res) => {
    try {
        const name = req.body["name"];
        const oldName = await pool.query('SELECT name FROM folders WHERE folder_id = $1', [req.params.id]);
        console.log(oldName.rows[0].name);
        await pool.query('UPDATE folders SET name = $1 WHERE folder_id = $2', [name, req.params.id]);
        await pool.query('UPDATE tasks SET folder = $1 WHERE folder_id = $2', [name, oldName.rows[0].name]);
        res.json();
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a folder
folderRouter.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await pool.query('DELETE FROM folders WHERE folder_id = $1', [id]);
        await pool.query('DELETE FROM tasks WHERE folder_id = $1', [id]);
        res.json();
    } catch (err) {
        console.error(err.message);
    }
});

export default folderRouter;
