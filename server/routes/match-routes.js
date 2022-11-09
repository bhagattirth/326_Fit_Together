// Get potential matches
// Accept match
// Reject match
// Get potential match profile information (profile without phone number)
import express from "express";

const profileImage =
	"https://static01.nyt.com/images/2020/11/18/arts/16taylor-masters/merlin_179096598_efc4232d-7251-4c29-b1c3-b4c4fb4d22fb-mediumSquareAt3X.jpg";
const profile = {
	firstName: "John",
	lastName: "Swift",
	phoneNumber: "978-8677-309",
	workoutStyle: "Push-Pull-Leg Split",
	workoutsPerWeek: 3,
	averageWorkoutLength: "2 Hours",
	preferredTime: "10 AM - 12 PM",
	preferredDays: ["monday", "tuesday"],
};
const profile2 = {
	firstName: "John2",
	lastName: "Swift",
	phoneNumber: "978-8677-309",
	workoutStyle: "Push-Pull-Leg Split",
	workoutsPerWeek: 3,
	averageWorkoutLength: "2 Hours",
	preferredTime: "10 AM - 12 PM",
	preferredDays: ["monday", "tuesday"],
};
const profile3 = {
	firstName: "John3",
	lastName: "Swift",
	phoneNumber: "978-8677-309",
	workoutStyle: "Push-Pull-Leg Split",
	workoutsPerWeek: 3,
	averageWorkoutLength: "2 Hours",
	preferredTime: "10 AM - 12 PM",
	preferredDays: ["monday", "tuesday"],
};

const router = express.Router();
router.route("/:id/potential").get((req, res) => {
	// Dummy data
	// return information about potential matches
	res.send({
		id: {
			profileImage: profileImage,
			profile: profile,
		},
		id2: {
			profileImage: profileImage,
			profile: profile2,
		},
		id3: {
			profileImage: profileImage,
			profile: profile3,
		},
	});
});
router
	.route("/:id/potential/:otherID")
	.delete((req, res) => {
		// removes otherID from id's potential match list
		res.send({ removed: true });
	})
	.put((req, res) => {
		// add's otherID to id's one way match list
		res.send({ added: true });
	});

export { router as matchRoutes };
