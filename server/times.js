import pool from "./db.js";
import { Router } from "express";
const timesRouter = Router();

timesRouter.get("/", async (req, res) => {
    try {
        const { taskId } = req.query;
        const results = await pool.query("SELECT elapsed_minutes, active FROM times WHERE task_id = $1", [taskId]);
        const { elapsed_minutes: elapsedMinutes, active } = results.rows[0];
        res.json({ 
            elapsedMinutes: elapsedMinutes,
            active: active
        });
    } catch (error) {
        console.error("Error getting elapsed time for task", error);
    }
});

timesRouter.patch("/setActive", async (req, res) => {
    try {
        const { taskId, isActive } = req.body;
        console.log(taskId, isActive);
        await pool.query("UPDATE times SET active = $1", [false]);
        if (isActive) {
            await pool.query("UPDATE times SET active = $1 WHERE task_id = $2", [true, taskId]);
        }
        res.json();
    } catch (error) {
        console.error("Error setting active task for timer", error);
    }
})

export default timesRouter;
