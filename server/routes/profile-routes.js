import express from "express";

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
router.delete("/:id", (req, res) => {
	// delete profile associated with id
	res.send(true);
});

router
	.route("/:id/information")
	.get((req, res) => {
		// Get information associated with ID
		res.send(dummyProfileData);
	})
	.put((req, res) => {
		// Set information associated with ID
		const newProfileData = req.body;
		res.send(newProfileData);
	});

router
	.route("/:id/picture")
	.get((req, res) => {
		// Send back profile picture of ID
		console.log("here");
		res.send({
			picture:
				"https://penntoday.upenn.edu/sites/default/files/2021-11/Taylor%20Swift-Main.jpg",
		});
	})
	.put((req, res) => {
		// Update profile picture of ID
		const image = req.body;
	});

export { router as profileRoutes };
