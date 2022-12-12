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

//Gets the pastworkout array given the id
router.get("/:id/getPast", validateToken, getPastUser);

//Gets important member info that will be displayed on matchHistory page
router.get("/:id/getProfileInfo", validateToken, getProfileInfo);

//Adds workout data to the workout arrays with another member in pastworkout array of the user
router.post("/addWorkout", validateToken, addWorkoutToUser);

//Updates user's rating for another member and updates member's average rating and numbers of review
router.post("/ratingUpdate", validateToken, updateRating);

//Deletes member entry in users pastworkout array and removes from twowaymatch array for both user and adds member to user's block list
router.delete("/deleteEntry", validateToken, deleteEntry);

export { router as matchHistoryRouter };
