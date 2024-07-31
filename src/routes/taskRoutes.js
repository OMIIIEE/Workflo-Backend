const express = require("express");
const {
  createTask,
  getTasksByUserId,
  getAllTasks,
  getTaskByTaskId,
  deleteTaskById,
  updateTaskById,
} = require("../controllers/taskController");
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/",authenticate, createTask);
router.get("/user",authenticate, getTasksByUserId);
router.get("/", getAllTasks);
router.get('/task/:taskId', getTaskByTaskId);
router.delete("/:taskId", deleteTaskById);
router.put("/:taskId", updateTaskById);

module.exports = router;