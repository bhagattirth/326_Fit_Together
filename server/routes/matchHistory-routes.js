"use strict";
import express from "express";
import {
	addWorkoutToUser,
	updateRating,
	deleteEntry,
	getPastUser,
} from "../controllers/matchHistory-controller.js";

let router = express.Router();

router.get("/getPast", getPastUser);

router.post("/addWorkout", addWorkoutToUser);

router.post("/ratingUpdate", updateRating);

router.post("/deleteEntry", deleteEntry);

export { router as matchHistoryRouter };
