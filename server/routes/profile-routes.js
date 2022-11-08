import express from "express";

const router = express.Router();
const dummyProfileData = {
	firstName: "Taylor",
	lastName: "Swift",
	phoneNumber: "978-8677-309",
	workoutStyle: "Push-Pull-Leg Split",
	workoutsPerWeek: 1,
	averageWorkoutLength: "2 Hours",
	preferredTime: "10 AM - 12 PM",
	preferredDays: ["monday", "tuesday"],
};
router.delete("/id", (req, res) => {
	// delete profile associated with id
});

router
	.route("/:id/information")
	.get((req, res) => {
		res.send(dummyProfileData);
	})
	.put((req, res) => {
		const newProfileData = JSON.parse(req.body);
		res.send(newProfileData);
	});

router
	.route("/:id/picture")
	.get((req, res) => {
		res.send("picture");
	})
	.put((req, res) => {
		const image = req.body;
		res.send(newProfileData);
	});

export { router as profileRoutes };
