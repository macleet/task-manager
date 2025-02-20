import pool from "./db.js";
import { Router } from "express";
const timesRouter = Router();

timesRouter.get("/getActive", async (req, res) => {
    try {
        const { taskId } = req.query;
        const results = await pool.query("SELECT active FROM times WHERE task_id = $1", [taskId]);
        const { active } = results.rows[0];
        res.json({ active });
    } catch (error) {
        console.error("Error getting active boolean for task", error);
    }
});

timesRouter.get("/getElapsedMinutes", async (req, res) => {
    try {
        const { taskId } = req.query;
        const results = await pool.query("SELECT elapsed_minutes, active FROM times WHERE task_id = $1", [taskId]);
        const { elapsed_minutes: elapsedMinutes } = results.rows[0];
        res.json({ elapsedMinutes });
    } catch (error) {
        console.error("Error getting elapsed time for task", error);
    }
});

timesRouter.patch("/setActive", async (req, res) => {
    try {
        const { taskId, isActive } = req.body;
        await pool.query("UPDATE times SET active = $1", [false]);
        await pool.query("UPDATE times SET active = $1 WHERE task_id = $2", [isActive, taskId]);
        res.json();
    } catch (error) {
        console.error("Error setting active task for timer", error);
    }
})

export default timesRouter;
