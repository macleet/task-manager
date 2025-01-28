import pool from "./db.js";
import { Router } from "express";
const folderRouter = Router();

// Get all folders
folderRouter.get("/", async (req, res) => {
    try {
        const folders = await pool.query("SELECT * FROM folders ORDER BY folder_id ASC");
        res.json(folders.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get folder name from folder id
folderRouter.get("/:id", async (req, res) => {
    try {
        const result = await pool.query("SELECT name FROM folders WHERE folder_id = $1", [req.params.id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error("get folder name error: ", err.message);
    }
});

// Add folder
folderRouter.post("/add/:name", async (req, res) => {
    try {
        const fid = await pool.query("INSERT INTO folders (name) VALUES ($1) RETURNING folder_id", [req.params.name]);
        res.json({ id: fid });
    } catch (err) {
        console.error("add folder error: ", err.message);
    }
});

// Change folder name
folderRouter.patch("/change/:id", async (req, res) => {
    try {
        const newName = req.body["name"];
        await pool.query("SELECT name FROM folders WHERE folder_id = $1", [req.params.id]);
        await pool.query("UPDATE folders SET name = $1 WHERE folder_id = $2", [newName, req.params.id]);
        res.json();
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a folder
folderRouter.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response = await pool.query("DELETE FROM folders WHERE folder_id = $1 RETURNING *", [id]);
        await pool.query("DELETE FROM tasks WHERE folder_id = $1", [id]);
        res.json(response.rows);
    } catch (err) {
        console.error(err.message);
    }
});

export default folderRouter;
