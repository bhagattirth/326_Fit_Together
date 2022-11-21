import { User } from "../app.js";

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
			user.workoutsPerWeek = newProfileData.workoutsPerWeek;
			user.avgWorkoutLength = newProfileData.averageWorkoutLength;
			user.startTime = newProfileData.startTime;
			user.endTime = newProfileData.endTime;
			user.prefDays = newProfileData.preferredDays;
			await user.save();
			res.status(200).send(JSON.stringify({ userID: id }));
		}
	});
};

export const getProfileInformation = (req, res, next) => {
	const id = req.params.id;
	console.log(id);
	User.findOne({ id: id }, (err, user) => {
		if (err) {
			res.status(400).send({});
		} else if (!user) {
			res.status(400).send({ message: "Could not find profile" });
		} else {
			const output = {};
			output.firstName = user.fName;
			output.lastName = user.lName;
			output.phoneNumber = user.phoneNumber;
			output.workoutStyle = user.workoutStyle;
			output.workoutsPerWeek = user.workoutsPerWeek;
			output.averageWorkoutLength = user.avgWorkoutLength;
			output.startTime = user.startTime;
			output.endTime = user.endTime;
			output.preferredDays = user.prefDays;
			res.status(200).send(JSON.stringify(output));
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
			console.log(profilePic.imageURL);
			user.profilePic = profilePic.imageURL;
			user.save();
			res.status(200).send(JSON.stringify({ userID: id }));
		}
	});
};

export const getProfilePicture = (req, res, next) => {
	const id = req.params.id;
	User.findOne({ id: id }, (err, user) => {
		if (err) {
			res.status(400).send();
		} else {
			res.status(200).send(
				JSON.stringify({ profilePic: user.profilePic })
			);
		}
	});
};

export const deleteProfile = (req, res, next) => {
	const id = req.params.id;
	User.findOne({ id: id }, (err, user) => {
		if (err) {
			res.status(400).send(err);
		} else {
			// Remove (to be) deleted user's id from all of its corresponding twoWayMatches' twoWayMatches list
			removeFromTwoWayMatch(user.twoWayMatches, id);
			removeOneWayMatches(id);
		}
	});
	// Delete the user
	User.deleteOne({ id: id }).then((result) => {
		if (result) {
			res.status(200).send(JSON.stringify({ userID: id }));
		} else {
			res.status(400).send("Error deleting profile");
		}
	});
};

function removeOneWayMatches(idToRemove) {
	User.find({ oneWayMatches: idToRemove }, async (err, usersArr) => {
		if (err) {
			return;
		} else {
			for (const curUser of usersArr) {
				const index = curUser.oneWayMatches.indexOf(idToRemove);
				curUser.oneWayMatches.splice(index, 1);
				await curUser.save();
			}
		}
	});
}

function removeFromTwoWayMatch(otherIDs, idToRemove) {
	User.find({ id: { $in: otherIDs } }, async (err, usersArr) => {
		if (err) {
			return;
		} else {
			for (const curUser of usersArr) {
				// Remove idToRemove from twoSidedMatches array and save changes if it exists
				const index = curUser.twoWayMatches.indexOf(idToRemove);
				if (index > -1) {
					curUser.twoWayMatches.splice(index, 1);
				}
				for (let i = 0; i < curUser.pastWorkouts.length; i++) {
					if (curUser.pastWorkouts[i].id === idToRemove) {
						curUser.pastWorkouts.splice(i, 1);
						break;
					}
				}
				await curUser.save();
			}
		}
	});
}
