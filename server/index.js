import "dotenv/config";
import taskRouter from "./task.js";
import subtaskRouter from "./subtask.js";
import folderRouter from "./folder.js";
import timesRouter from "./times.js";
import cors from "cors";
import express from "express";

const app = express();
const PORT = 3000;

/* Middlewares */
app.use(cors({
    origin: "*"
}));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/task", taskRouter);
app.use("/subtask", subtaskRouter);
app.use("/folder", folderRouter);
app.use("/times", timesRouter);

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
})
