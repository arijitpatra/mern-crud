const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost:27017/task_manager", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

const Task = mongoose.model("Task", {
  title: String,
  description: String,
});

app.use(cors());
app.use(bodyParser.json());

// create new task
app.post("/v1/api/tasks", async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title, description });
  try {
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get all tasks
app.get("/v1/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get a task by ID
app.get("/v1/api/tasks/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update a task by ID
app.put("/v1/api/tasks/:id", async (req, res) => {
  const id = res.params.id;
  const { title, description } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete task by ID
app.delete("/v1/api/tasks/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedTask = await Task.findByIdAndRemove(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`backend server is running on port ${port}`);
});
