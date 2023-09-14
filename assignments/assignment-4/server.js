import express from "express";
import { stories } from "./data.js";
import { validate, v4 as uuid } from "uuid";

const app = express();
app.use(express.json());

const PORT = 4040;

const newId = uuid();
const differentID = uuid();

app.get("/stories", (req, res) => {
    res.status(200).json({ data: stories });
});

app.post("/stories", (req, res) => {
    const newStory = req.body;

    stories[newId] = newStory;

    res.status(201).json({ data: newStory });
});

app.get("/stories/:storiesId", (req, res) => {
    const storiesId = req.params.storiesId;

    if (!validate(storiesId) || !stories[stories]) {
        return res.status(400).json({ message: "Not a valid story ID" });
    }

    res.status(200).json({ data: stories[storiesId] });
});

app.put("/stories/storiesId", (req, res) => {
    const storiesId = req.params.storiesId;
    const updatedData = req.body;

    if (!validate(storiesId) || !stories[stories]) {
        return res.status(400).json({ message: "Not a valid story ID" });
    }

    stories[stories] = { ...stories[storiesId], updatedData };

    res.status(200).json({ data: stories[storiesId] });
});

app.get("stories/subtasks", (req, res) => {
    const allSubTasks = {};

    for (const storyId in stories) {
        const story = stories[storyId];

        const tasksObj = story.tasks;

        for (const taskId in tasksObj) {
            const task = tasksObj[taskId];

            allSubTasks[newId] = task;
        }
    }

    res.status(200).json({ data: allSubTasks });
});

app.post("/stories/subtasks", (req, res) => {
    for (const storyId in stories) {
        const story = stories[storyId];

        const tasksObj = story.tasks;

        const newSubTask = req.body;

        tasksObj[differentID] = newSubTask;

        res.status(201).json({ data: newSubTask });
    }
});

app.put("/stories/subtasks/:subtasksId", (req, res) => {
    for (const storyId in stories) {
        const story = stories[storyId];
        const tasksObj = story.tasks;

        const subtaskId = req.params.subtasksId;

        const updatedStatus = req.body;

        if (tasksObj[subtaskId]) {
            tasksObj[subtaskId].status = updatedStatus;
        }

        res.status(200).json({ data: tasksObj[subtaskId] });
    }
});

app.get("/stories/subtasks/:subtasksId", (req, res) => {
    for (const storyId in stories) {
        const story = stories[storyId];
        const tasksObj = story.tasks;

        const subtaskId = req.params.subtasksId;

        const subtask = tasksObj[subtaskId];

        res.status(200).json({ data: subtask });
    }
});

app.delete("/stories/subtasks/:subtasksId", (req, res) => {
    for (const storyId in stories) {
        const story = stories[storyId];
        const tasksObj = story.tasks;

        const subtaskId = req.params.subtasksId;

        delete tasksObj[subtaskId];
        res.status(204).send();
    }
});

app.app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
