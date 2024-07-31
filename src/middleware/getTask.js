const Task = require('../models/task');

const getTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }
    res.task = task;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = getTask;
