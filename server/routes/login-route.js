import express from "express";
import { loginUser } from "../controllers/login-controller.js";

const router = express.Router();

// existing user route
router.post("/returningUser", loginUser);

export { router as loginRoutes };
