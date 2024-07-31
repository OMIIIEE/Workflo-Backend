const Task = require("../models/task");

const createTask = async (req, res) => {
  try {
    const { title, des, status, priority, deadline } = req.body;
    const userId = req.userId; 

    const task = new Task({ userId, title, des, status, priority, deadline });
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


const getTasksByUserId = async (req, res) => {

  try {
    const userId = req.userId; 
    const tasks = await Task.find({ userId });
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};


const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getTaskByTaskId = async (req, res) => {
  const taskId = req.params.taskId;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { getTaskByTaskId };


const deleteTaskById = async (req, res) => {
  const taskId = req.params.taskId;

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res
      .status(200)
      .json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updateTaskById = async (req, res) => {
  const taskId = req.params.taskId;

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
      new: true,
    });
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  createTask,
  getTasksByUserId,
  getAllTasks,
  getTaskByTaskId,
  deleteTaskById,
  updateTaskById,
};

