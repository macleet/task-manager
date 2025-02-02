import "dotenv/config";
import taskRouter from "./task.js";
import subtaskRouter from "./subtask.js";
import folderRouter from "./folder.js";
import cors from "cors";
import express from "express";

const app = express();
const PORT = 8000;

/* Middlewares */
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/task", taskRouter);
app.use("/subtask", subtaskRouter);
app.use("/folder", folderRouter);

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
})
