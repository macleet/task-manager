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
        const results = await pool.query("SELECT elapsed_minutes FROM times WHERE task_id = $1", [taskId]);
        const totalMinutes = results.rows.reduce((acc, row) => acc + row.elapsed_minutes, 0);
        const durationText = convertTimeDuration(totalMinutes);
        res.json({ durationText });
    } catch (error) {
        console.error("Error getting elapsed time for task", error);
    }
});

timesRouter.get("/getRestedMinutes", async (req, res) => {
    try {
        const { taskId } = req.query;
        const results = await pool.query("SELECT rested_minutes FROM times WHERE task_id = $1", [taskId]);
        const totalMinutes = results.rows.reduce((acc, row) => acc + row.rested_minutes, 0);
        const durationText = convertTimeDuration(totalMinutes);
        res.json({ durationText });
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
    try {
        const { taskId, elapsedTime, currentDate } = req.body;
        const result = await pool.query("SELECT elapsed_minutes FROM times WHERE task_id = $1 AND date = $2", [taskId, currentDate]);
        if (result.rowCount < 1) {
            await pool.query("INSERT INTO times (task_id, date, elapsed_minutes) VALUES ($1, $2, $3)", [taskId, currentDate, elapsedTime]);
            return res.json();
        }
        const { elapsed_minutes: currentMinutes } = result.rows[0];
        await pool.query("UPDATE times SET elapsed_minutes = $1 WHERE task_id = $2 AND date = $3", [elapsedTime + currentMinutes, taskId, currentDate]);
        res.json();
    } catch (error) {
        console.error("Error setting elapsed minutes", error);
    }
});

timesRouter.patch("/setRestedMinutes", async (req, res) => {
    try {
        const { taskId, elapsedTime, currentDate } = req.body;
        const result = await pool.query("SELECT rested_minutes FROM times WHERE task_id = $1 AND date = $2", [taskId, currentDate]);
        if (result.rowCount < 1) {
            await pool.query("INSERT INTO times (task_id, date, rested_minutes) VALUES ($1, $2, $3)", [taskId, currentDate, elapsedTime]);
            return res.json();
        }
        const { rested_minutes: currentMinutes } = result.rows[0];
        await pool.query("UPDATE times SET rested_minutes = $1 WHERE task_id = $2 AND date = $3", [elapsedTime + currentMinutes, taskId, currentDate]);
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
    const { taskId, periodDates } = req.query;
    const activeData = [], restData = [];

    try {
        const result = await pool.query(
            "SELECT TO_CHAR(date, 'YYYY-MM-DD') AS date, elapsed_minutes, rested_minutes FROM times WHERE task_id = $1 AND date = ANY($2::date[])",
            [taskId, periodDates]
        );

        const dataMap = result.rows.reduce((acc, row) => {
            acc[row.date] = row;
            return acc;
        }, {});

        for (const date of periodDates) {
            const { elapsed_minutes: elapsedMinutes = 0, rested_minutes: restedMinutes = 0 } = dataMap[date] || {};
            const toHours = (minutes) => minutes / 60;
            activeData.push(toHours(elapsedMinutes));
            restData.push(toHours(restedMinutes));
        }

        res.json({ activeData, restData });
    } catch (error) {
        console.error("Error getting chart data", error);
    }
});

export default timesRouter;
