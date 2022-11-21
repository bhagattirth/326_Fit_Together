"use strict";
import express from "express";
import { validateToken } from "../helpers/JWT.js";
import {
	addWorkoutToUser,
	updateRating,
	deleteEntry,
	getPastUser,
	getProfileInfo,
} from "../controllers/matchHistory-controller.js";

let router = express.Router();

router.get("/:id/getPast", validateToken, getPastUser);

router.get("/:id/getProfileInfo", validateToken, getProfileInfo);

router.post("/addWorkout", validateToken, addWorkoutToUser);

router.post("/ratingUpdate", validateToken, updateRating);

router.delete("/deleteEntry", validateToken, deleteEntry);

export { router as matchHistoryRouter };
