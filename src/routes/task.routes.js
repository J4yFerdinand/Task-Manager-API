import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from "../controllers/taskController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

//* Protected routes (requires authentication)

//* Get all tasks for an authenticated user
router.get("/", authMiddleware, getTasks);

//* Get a specific task by ID
router.get("/:id", authMiddleware, getTaskById);

//* Create a new task
router.post("/", authMiddleware, createTask);

//* Update an existing task by ID
router.put("/:id", authMiddleware, updateTask);

//* Delete a task
router.delete("/:id", authMiddleware, deleteTask);

export default router;