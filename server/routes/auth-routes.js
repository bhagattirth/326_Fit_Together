import express from "express";
import { loginUser, signupUser } from "../controllers/login-controller.js";

const router = express.Router();

// existing user route
router.post("/login", loginUser);

// sign up route
router.post("/signup", signupUser);

export { router as authRoutes };
