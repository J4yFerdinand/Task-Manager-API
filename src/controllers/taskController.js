import Task from "../models/Task.js";

//* Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;

    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      user: req.user.id
    });

    await newTask.save();

    res.status(201).json({
      message: "Task created successfully",
      task: {
        taskId: newTask.taskId,
        title: newTask.title,
        description: newTask.description,
        dueDate: newTask.dueDate,
        priority: newTask.priority,
        status: newTask.status,
        user: newTask.user
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error: error.message });
  }
};

//* Get all tasks for an authenticated user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });

    res.status(200).json(tasks.map(task => ({
      taskId: task.taskId,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      status: task.status,
      user: task.user
    })));
  } catch (error) {
    res.status(500).json({ message: "Error getting tasks", error: error.message });
  }
};

//* Get a specific task by ID
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ taskId: req.params.id, user: req.user.id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      taskId: task.taskId,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      status: task.status,
      user: task.user
    });
  } catch (error) {
    res.status(500).json({ message: "Error getting task", error: error.message });
  }
};

//* Update an existing task by ID
export const updateTask = async (req, res) => {
  try {
    const updateTask = await Task.findOneAndUpdate(
      { taskId: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!updateTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task: {
        taskId: updateTask.taskId,
        title: updateTask.title,
        description: updateTask.description,
        dueDate: updateTask.dueDate,
        priority: updateTask.priority,
        status: updateTask.status,
        user: updateTask.user
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error: error.message });
  }
};

//* Delete a task
export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ taskId: req.params.id, user: req.user.id });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error: error.message });
  }
};