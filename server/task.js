import pool from "./db.js";
import { Router } from "express";
const taskRouter = Router();

// Create a task
taskRouter.post("/add", async (req, res) => {
    try {
        const { name, folderId } = req.body;
        await pool.query("INSERT INTO tasks (name, folder_id) VALUES ($1, $2)", [name, folderId]);
        res.json();
    } catch (err) {
        console.error("Error creating new task", err.message);
    }
});

// Delete all tasks
taskRouter.delete("/delete/all", async (req, res) => {
    try {
        await pool.query("TRUNCATE tasks");
        await pool.query("DELETE FROM folders WHERE NOT name = 'Main'");
        res.json();
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a task
taskRouter.delete("/delete", async (req, res) => {
    try {
        const { id: taskId } = req.body;
        await pool.query("DELETE FROM tasks WHERE task_id = $1", [taskId]);  // Delete task from folder
        res.json();
    } catch (err) {
        console.error(err.message);
    }
});

// Search
taskRouter.get("/search", async (req, res) => {
    try {
        const search_query = req.query.search_query.toLowerCase();
        const results = await pool.query("SELECT * FROM tasks WHERE name ILIKE $1 OR name ILIKE $2", [`${search_query}%`, `%${search_query}%`]);
        res.json(results.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get all tasks from folder
taskRouter.get("/getAll/:folderId", async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM tasks WHERE folder_id = $1 ORDER BY task_id ASC", [+req.params.folderId]);
        res.json(results.rows);
    } catch (err) {
        console.error("Error retrieving all tasks", err.message);
    }
});

// Get a task
taskRouter.get("/get/:id", async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM tasks WHERE task_id = $1", [req.params.id]);
        res.json(results.rows);
    } catch (err) {
        console.error(`Error retrieving task with id ${req.params.id}`, err.message);
    }
});

// Change priority
taskRouter.put("/priority/:id", async (req, res) => {
    const { newPriority } = req.body;
    try {
       await pool.query("UPDATE tasks SET priority = $1 WHERE task_id = $2", [newPriority, req.params.id]);
        res.json();
    } catch (err) {
        console.error(err.message);
    }
});

// Update a task name
taskRouter.put("/update/:id", async (req, res) => {
    try {
        const newText = req.body["new_name"];
        const result = await pool.query("UPDATE tasks SET name = $1 WHERE task_id = $2 RETURNING *", [newText, req.params.id]);
        res.json(result.rows);
    } catch (err) {
        console.error("Error updating task name", err.message);
    }
});

// Change task's folder
taskRouter.put("/move/:id", async (req, res) => {
    try {
        const { folder } = req.body;
        await pool.query("UPDATE tasks SET folder = $1 WHERE task_id = $2 RETURNING *", [folder, req.params.id]);
        res.json();
    } catch (err) {
        console.error(err.message);
    }
});

taskRouter.get("/dueDate/:id", async (req, res) => {
    try {
        const results = await pool.query("SELECT due_date FROM tasks WHERE task_id = $1", [req.params.id]);
        res.json(results.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Change due date
taskRouter.put("/dateChange/:id", async (req, res) => {
    try {
        const newDate = req.body["new_date"];
        const result = await pool.query("UPDATE tasks SET due_date = $1 WHERE task_id = $2 RETURNING *", [newDate, req.params.id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Change name
taskRouter.put("/nameChange/:id", async (req, res) => {
    try {
        const { newName } = req.body;
        const result = await pool.query("UPDATE tasks SET name = $1 WHERE task_id = $2 RETURNING *", [newName, req.params.id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
    }
});

export default taskRouter;
