import pool from "./db.js";
import { Router } from "express";
const timesRouter = Router();

timesRouter.get("/getActive", async (req, res) => {
    try {
        const { taskId } = req.query;
        const results = await pool.query("SELECT active FROM times WHERE task_id = $1", [taskId]);
        const { active } = results.rows[0];
        res.json({ active: active });
    } catch (error) {
        console.error("Error getting active boolean for task", error);
    }
});

timesRouter.get("/getElapsedMinutes", async (req, res) => {
    try {
        const { taskId } = req.query;
        const results = await pool.query("SELECT elapsed_minutes, active FROM times WHERE task_id = $1", [taskId]);
        const { elapsed_minutes: elapsedMinutes, active } = results.rows[0];
        res.json({ elapsedMinutes, active });
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
});

timesRouter.patch("/setElapsedMinutes", async (req, res) => {
    try {
        const { taskId, elapsedTime } = req.body;
        const result = await pool.query("SELECT elapsed_minutes FROM times WHERE task_id = $1", [taskId]);
        const { elapsed_minutes: currentMinutes } = result.rows[0];
        await pool.query("UPDATE times SET elapsed_minutes = $1 WHERE task_id = $2", [elapsedTime + currentMinutes, taskId]);
        res.json();
    } catch (error) {
        console.error("Error setting elapsed minutes", error);
    }
});

timesRouter.patch("/setRestedMinutes", async (req, res) => {
    try {
        const { taskId, elapsedTime } = req.body;
        const result = await pool.query("SELECT rested_minutes FROM times WHERE task_id = $1", [taskId]);
        const { rested_minutes: currentMinutes } = result.rows[0];
        await pool.query("UPDATE times SET rested_minutes = $1 WHERE task_id = $2", [elapsedTime + currentMinutes, taskId]);
        res.json();
    } catch (error) {
        console.error("Error setting rested minutes", error);
    }
});

export default timesRouter;
