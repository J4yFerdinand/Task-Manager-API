import express from "express";
import { 
  registerUser, 
  loginUser, 
  getUserProfile 
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

//* Route for registering a new user
router.post("/register", registerUser);

//* Route for logging in a user
router.post("/login", loginUser);

//* Route for getting user profile (requires authentication)
router.get("/profile", authMiddleware, getUserProfile);

export default router;