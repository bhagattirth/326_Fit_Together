import express from "express";
import {
	loginUser,
	signupUser,
	validateUser,
} from "../controllers/login-controller.js";

import { validateToken } from "../helpers/JWT.js";

const router = express.Router();

// existing user route
router.post("/login", loginUser);

// sign up route
router.post("/signup", signupUser);

router.get("/validateUser", validateToken, validateUser);

export { router as authRoutes };
