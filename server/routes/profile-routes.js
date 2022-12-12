import express from "express";
import {
	updateProfileInformation,
	getProfileInformation,
	updateProfilePicture,
	getProfilePicture,
	deleteProfile,
} from "../controllers/profile-controller.js";
import { validateToken } from "../helpers/JWT.js";

const router = express.Router();
const dummyProfileData = {
	firstName: "John",
	lastName: "Swift",
	phoneNumber: "978-8677-309",
	workoutStyle: "Push-Pull-Leg Split",
	workoutsPerWeek: 3,
	averageWorkoutLength: "2 Hours",
	preferredTime: "10 AM - 12 PM",
	preferredDays: ["monday", "tuesday"],
};
router.delete("/:id", validateToken, deleteProfile);

router
	.route("/:id/information")
	.get(
		validateToken,
		getProfileInformation
		// 	(req, res) => {
		// 	// Get information associated with ID
		// 	res.send(dummyProfileData);
		// }
	)
	.put(
		validateToken,
		updateProfileInformation
		// 	(req, res) => {
		// 	// Set information associated with ID
		// 	const newProfileData = req.body;
		// 	res.send(newProfileData);
		// }
	);

router
	.route("/:id/picture")
	.get(
		validateToken,
		getProfilePicture
		// 	(req, res) => {

		// 	// Send back profile picture of ID
		// 	console.log("here");
		// 	res.send({
		// 		picture:
		// 			"https://penntoday.upenn.edu/sites/default/files/2021-11/Taylor%20Swift-Main.jpg",
		// 	});
		// }
	)
	.put(
		validateToken,
		updateProfilePicture
		// 	(req, res) => {
		// 	// Update profile picture of ID
		// 	const image = req.body;
		// }
	);

export { router as profileRoutes };
