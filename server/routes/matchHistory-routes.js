"use strict";
import express from "express";
import {
	addWorkoutToUser,
	updateRating,
	deleteEntry,
	getPastUser,
	getProfileInfo
} from "../controllers/matchHistory-controller.js";

let router = express.Router();

router.get("/:id/getPast", getPastUser);

router.get("/:id/getProfileInfo", getProfileInfo);

router.post("/addWorkout", addWorkoutToUser);

router.post("/ratingUpdate", updateRating);

router.delete("/deleteEntry", deleteEntry);

export { router as matchHistoryRouter };
