import express from "express";
import { validateToken } from "../helpers/JWT.js";
import {
	findPotentialMatches,
	addToBlockList,
	addMatch,
} from "../controllers/match-controller.js";

const router = express.Router();
router.route("/:id/potential").get(validateToken, findPotentialMatches);
router
	.route("/:id/potential/:otherID")
	.delete(validateToken, addToBlockList)
	.put(validateToken, addMatch);

export { router as matchRoutes };
