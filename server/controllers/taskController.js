const Task = require("../models/Task");

const createTask = async (req, res) => {

  try {

    const {
      title,
      description,
      assignedTo,
      project
    } = req.body;

    const task = await Task.create({
      title,
      description,
      assignedTo,
      project
    });

    res.status(201).json(task);

  } catch(error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const getTasks = async (req, res) => {

  try {

    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("project", "title");

    res.json(tasks);

  } catch(error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const updateTaskStatus = async (req, res) => {

  try {

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task Not Found"
      });
    }

    task.status = req.body.status;

    await task.save();

    res.json(task);

  } catch(error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus
};