import pool from "./db.js";
import { Router } from "express";
const subtaskRouter = Router();

import OpenAI from "openai";
const openai = new OpenAI();

// Get subtask phases for a specific task
subtaskRouter.get("/phases", async (req, res) => {
    try {
        const { taskId } = req.query;
        const result = await pool.query("SELECT * FROM phases WHERE task_id = $1 ORDER BY phase_id ASC", [taskId]);
        // Send the phases or null if none found
        res.json({ phases: result.rowCount > 0 ? result.rows : null });
    } catch (error) {
        console.error("Error retrieving subtask", error);
    }
});

// Get subtask steps for a specific phase
subtaskRouter.get("/steps", async (req, res) => {
    try {
        const { phaseId } = req.query;
        const result = await pool.query("SELECT * FROM steps WHERE phase_id = $1 ORDER BY step_id ASC", [phaseId]);
        // Send the steps or null if none found
        res.json({ steps: result.rowCount > 0 ? result.rows : null });
    } catch (error) {
        console.error("Error retrieving subtask", error);
    }
});

// Update the completion status of a phase
subtaskRouter.patch("/completedPhase", async (req, res) => {
    try {
        const { phaseId, completed } = req.body;
        await pool.query("UPDATE phases SET completed = $1 WHERE phase_id = $2", [completed, phaseId]);
        res.json();
    } catch (error) {
        console.error("Error patching completed property for phase", error);
    }
});

// Update the completion status of a step
subtaskRouter.patch("/completedStep", async (req, res) => {
    try {
        const { stepId, completed } = req.body;
        await pool.query("UPDATE steps SET completed = $1 WHERE step_id = $2", [completed, stepId]);
        res.json();
    } catch (error) {
        console.error("Error patching completed property for step", error);
    }
});

// Generate subtask phases using OpenAI to generate subtasks
subtaskRouter.post("/generate", async (req, res) => {
    const { taskName, taskDetails, taskId } = req.body;
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    "role": "system",
                    "content": "You are a task management assistant designed to help break down large tasks into smaller, actionable steps for users. Provide a clear breakdown of tasks and organize them into phases, steps, and detailed descriptions, ensuring logical progression for task completion. The phase names, do not inlcude numbering like 'Phase 1' and 'Phase 2'."
                },
                {
                    "role": "user",
                    "content": `Task name: ${taskName}. Task details: ${taskDetails}.`
                }
            ],
            response_format: {
                type: "json_schema",
                json_schema: {
                    name: "task_breakdown",
                    schema: {
                        type: "object",
                        properties: {
                            task: {
                                type: "object",
                                properties: {
                                    title: { type: "string" },
                                    description: { type: "string" },
                                    phases: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                phase_name: { type: "string" },
                                                phase_description: { type: "string" },
                                                steps: {
                                                    type: "array",
                                                    items: {
                                                        type: "object",
                                                        properties: {
                                                            step_name: { type: "string" },
                                                            step_description: { type: "string" },
                                                            estimated_time: { type: "string" }
                                                        },
                                                        required: ["step_name", "step_description"],
                                                        additionalProperties: false
                                                    }
                                                }
                                            },
                                            required: ["phase_name", "steps"],
                                            additionalProperties: false
                                        }
                                    }
                                },
                                required: ["title", "phases"],
                                additionalProperties: false
                            }
                        },
                        required: ["task"],
                        additionalProperties: false
                    }
                }
            }
        });

        const phases = await JSON.parse(response.choices[0].message.content).task.phases;

        // Insert the phases and steps into the database
        await phases.map(async (phase) => {
            // Insert the phase into the database
            const { phase_id: phaseId } = (await pool.query("INSERT INTO phases (task_id, phase_name, phase_description) VALUES ($1, $2, $3) RETURNING phase_id", [taskId, phase.phase_name, phase.phase_description])).rows[0];
            
            // Insert each step associated with the phase into the database
            phase.steps.map(async (step) => await pool.query("INSERT INTO steps (phase_id, step_name, step_description) VALUES ($1, $2, $3)", [phaseId, step.step_name, step.step_description]));
        });

        res.json();
    } catch (error) {
        console.error("Error generating subtask", error);
    }
});

export default subtaskRouter;
