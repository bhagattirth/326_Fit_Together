import User from "../app.js";

// const dummyProfileData = {
// 	firstName: "John",
// 	lastName: "Swift",
// 	phoneNumber: "978-8677-309",
// 	workoutStyle: "Push-Pull-Leg Split",
// 	workoutsPerWeek: 3,
// 	averageWorkoutLength: "2 Hours",
// 	preferredTime: "10 AM - 12 PM",
// 	preferredDays: ["monday", "tuesday"],
// };

// id: String,
// email: String,
// password: String,
// fName: String,
// lName: String,
// profilePic: String,
// phoneNumber: String,
// workoutStyle: String,
// workoutsPerWeek: Number,
// avgWorkoutLength: Number,
// startTime: String,
// endTime: String,
// prefDays: String,
// pastWorkouts: [
// 	{
// 		id: String,
// 		date: String,
// 		workoutTitle: String,
// 		workout: [String],
// 	},
// ],
// rating: Number,
// numberOfRatings: Number,
// matches: [String],
// blocked: [String],

export const updateProfileInformation = (req, res, next) => {
	const id = req.params.id;
	User.findOne({ id: id }, async (err, user) => {
		if (err) {
			res.status(400).send();
		} else {
			const newProfileData = req.body;
			user.fName = newProfileData.firstName;
			user.lName = newProfileData.lastName;
			user.phoneNumber = newProfileData.phoneNumber;
			user.workoutStyle = newProfileData.workoutStyle;
			user.avgWorkoutLength = newProfileData.averageWorkoutLength;
			user.startTime = newProfileData.startTime;
			user.endTime = newProfileData.endTime;
			user.prefDays = newProfileData.preferredDays;
			await user.save();
			res.status(200);
			res.send(id);
		}
	});
};

export const getProfileInformation = (req, res, next) => {
	const id = req.params.id;
	User.findOne({ id: id }, (err, user) => {
		if (err) {
			res.status(400).send();
		} else {
			const output = {};
			output.firstName = user.fName;
			output.lastName = user.lName;
			output.phoneNumber = user.phoneNumber;
			output.workoutStyle = user.workoutStyle;
			output.averageWorkoutLength = user.avgWorkoutLength;
			output.startTime = user.startTime;
			output.endTime = user.endTime;
			output.preferredDays = user.prefDays;
			res.status(200);
			res.send(output);
		}
	});
};

export const updateProfilePicture = (req, res, next) => {
	const id = req.params.id;
	User.findOne({ id: id }, (err, user) => {
		const profilePic = req.body;
		if (err) {
			res.status(400).send();
		} else {
			user.profilePic = profilePic;
			res.status(200).send(id);
		}
	});
};

export const getProfilePicture = (req, res, next) => {
	const id = req.params.id;
	User.findOne({ id: id }, (err, user) => {
		if (err) {
			res.status(400).send();
		} else {
			res.status(200).send(user.profilePic);
		}
	});
};

export const deleteProfile = (req, res, next) => {
	const id = req.params.id;
	User.findOne({ id: id }, (err, user) => {
		if (err) {
			res.status(400).send();
		} else {
			// Remove (to be) deleted user's id from all of its corresponding twoWayMatches' twoWayMatches list
			for (const otherID of user.twoWayMatches) {
				removeFromTwoWayMatch(otherID, id);
			}
		}
	});
	// Delete the user
	User.deleteOne({ id: id }).then((result) => {
		if (result) {
			res.status(200).send(id);
		} else {
			res.status(400).send();
		}
	});
};

function removeFromTwoWayMatch(otherID, idToRemove) {
	User.findOne({ id: otherID }, async (err, user) => {
		if (err) {
			return;
		} else {
			// Remove idToRemove from twoSidedMatches array and save changes if it exists
			const index = user.twoWayMatches.indexOf(idToRemove);
			if (index > -1) {
				user.twoWayMatches.splice(index, 1);
				await user.save();
			}
		}
	});
}
