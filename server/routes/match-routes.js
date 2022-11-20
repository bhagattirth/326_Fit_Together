import express from "express";
import { validateToken } from "../helpers/JWT.js";
import {
	findPotentialMatches,
	addToBlockList,
	addMatch,
} from "../controllers/match-controller.js";

// const profileImage =
// 	"https://static01.nyt.com/images/2020/11/18/arts/16taylor-masters/merlin_179096598_efc4232d-7251-4c29-b1c3-b4c4fb4d22fb-mediumSquareAt3X.jpg";
// const profile = {
// 	firstName: "John",
// 	lastName: "Swift",
// 	phoneNumber: "978-8677-309",
// 	workoutStyle: "Push-Pull-Leg Split",
// 	workoutsPerWeek: 3,
// 	averageWorkoutLength: "2 Hours",
// 	preferredTime: "10 AM - 12 PM",
// 	preferredDays: ["monday", "tuesday"],
// };
// const profile2 = {
// 	firstName: "John2",
// 	lastName: "Swift",
// 	phoneNumber: "978-8677-309",
// 	workoutStyle: "Push-Pull-Leg Split",
// 	workoutsPerWeek: 3,
// 	averageWorkoutLength: "2 Hours",
// 	preferredTime: "10 AM - 12 PM",
// 	preferredDays: ["monday", "tuesday"],
// };
// const profile3 = {
// 	firstName: "John3",
// 	lastName: "Swift",
// 	phoneNumber: "978-8677-309",
// 	workoutStyle: "Push-Pull-Leg Split",
// 	workoutsPerWeek: 3,
// 	averageWorkoutLength: "2 Hours",
// 	preferredTime: "10 AM - 12 PM",
// 	preferredDays: ["monday", "tuesday"],
// };

const router = express.Router();
router.route("/:id/potential").get(validateToken, findPotentialMatches);
router
	.route("/:id/potential/:otherID")
	.delete(validateToken, addToBlockList)
	.put(validateToken, addMatch);

export { router as matchRoutes };
