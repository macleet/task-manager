import pool from "./db.js";
import { Router } from "express";
import { convertTimeDuration } from "./utilities.js";
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
        const durationText = convertTimeDuration(elapsedMinutes);
        res.json({ durationText, active });
    } catch (error) {
        console.error("Error getting elapsed time for task", error);
    }
});

timesRouter.get("/getRestedMinutes", async (req, res) => {
    try {
        const { taskId } = req.query;
        const results = await pool.query("SELECT rested_minutes, active FROM times WHERE task_id = $1", [taskId]);
        const { rested_minutes: restedMinutes, active } = results.rows[0];
        const durationText = convertTimeDuration(restedMinutes);
        res.json({ durationText, active });
    } catch (error) {
        console.error("Error getting rested time for task", error);
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
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);  // Set time to midnight
    try {
        const { taskId, elapsedTime } = req.body;
        const result = await pool.query("SELECT elapsed_minutes, date FROM times WHERE task_id = $1", [taskId]);
        const { elapsed_minutes: currentMinutes, date } = result.rows[0];
        if (date !== currentDate) {
            await pool.query("INSERT INTO times (task_id, date, elapsed_time) VALUES ($1, $2, $3)", [taskId, currentDate, elapsedTime]);
        } else {
            await pool.query("UPDATE times SET elapsed_minutes = $1 WHERE task_id = $2 AND date = $3", [elapsedTime + currentMinutes, taskId, date]);
        }
        res.json();
    } catch (error) {
        console.error("Error setting elapsed minutes", error);
    }
});

timesRouter.patch("/setRestedMinutes", async (req, res) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);  // Set time to midnight
    try {
        const { taskId, elapsedTime } = req.body;
        const result = await pool.query("SELECT rested_minutes, date FROM times WHERE task_id = $1", [taskId]);
        const { rested_minutes: currentMinutes, date } = result.rows[0];
        if (date !== currentDate) {
            await pool.query("INSERT INTO times (task_id, date, rested_time) VALUES ($1, $2, $3)", [taskId, currentDate, elapsedTime]);
        } else {
            await pool.query("UPDATE times SET rested_minutes = $1 WHERE task_id = $2 AND date = $3", [elapsedTime + currentMinutes, taskId, date]);
        }
        res.json();
    } catch (error) {
        console.error("Error setting rested minutes", error);
    }
});

timesRouter.get("/getActiveTask", async (req, res) => {
    const { taskId } = req.query;
    try {
        const query = `
            SELECT folders.name AS folder_name, tasks.name AS task_name
            FROM tasks
            JOIN folders ON tasks.folder_id = folders.folder_id
            WHERE tasks.task_id = $1;
        `;
        const result = await pool.query(query, [taskId]);
        const { folder_name: folderName, task_name: taskName } = result.rows[0];
        res.json({ folderName, taskName });
    } catch (error) {
        console.error("Error getting active task info", error);
    }
});

timesRouter.get("/getChartData", async (req, res) => {
    const activeData = [], restData = [];
    const { taskId, periodDates } = req.query;
    try {
        for (const date of periodDates) {
            const result = await pool.query("SELECT elapsed_minutes, rested_minutes FROM times WHERE task_id = $1 AND date = $2", [taskId, date]);
            const { elapsed_minutes: elapsedMinutes, rested_minutes: restedMinutes } = result.rows[0];
            activeData.push(elapsedMinutes / 60);  // Push hours
            restData.push(restedMinutes / 60);  // Push hours
        }
        res.json({ activeData, restData });
    } catch (error) {
        console.error("Error getting chart data", error);
    }
});

export default timesRouter;
