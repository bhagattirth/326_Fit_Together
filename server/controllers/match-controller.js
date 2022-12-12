import { User } from "../app.js";

// Finds the potential matches for a user
export const findPotentialMatches = (req, res, next) => {
	const id = req.params.id;
	// Find the user and ensure they exist
	User.findOne({ id: id }, (err, user) => {
		if (err) {
			res.status(400).send({ message: err });
		} else if (!user) {
			res.status(400).send({ message: "Couldn't find user" });
		} else {
			// Find all users not in the current user's blocked, oneWayMatches, twoWayMatches lists, and that aren't the user themselves
			User.find(
				{
					$and: [
						{ id: { $nin: user.blocked } },
						{ id: { $nin: user.oneWayMatches } },
						{ id: { $nin: user.twoWayMatches } },
						{ id: { $ne: id } },
					],
				},
				(err, usersArr) => {
					const potentialMatches = {};
					if (err) {
						res.status(400).send({ message: err });
					}
					for (const curUser of usersArr) {
						// Generate a potential match object pertaining to the current potential match user
						potentialMatches[curUser.id] = {
							profileImage: curUser.profilePic,
							profile: {
								firstName: curUser.fName,
								lastName: curUser.lName,
								phoneNumber: curUser.phoneNumber,
								workoutStyle: curUser.workoutStyle,
								averageWorkoutLength: curUser.avgWorkoutLength,
								workoutsPerWeek: curUser.workoutsPerWeek,
								startTime: curUser.startTime,
								endTime: curUser.endTime,
								preferredDays: curUser.prefDays,
								rating: curUser.rating,
							},
						};
					}
					// Return the potential matches
					res.status(200).send(JSON.stringify(potentialMatches));
				}
			);
		}
	});
};

// Blocks a user
export const addToBlockList = (req, res, next) => {
	const id = req.params.id;
	const otherID = req.params.otherID;
	User.findOne({ id: id }, async (err, user) => {
		if (err) {
			res.status(400).send({ message: err });
		} else if (!user) {
			res.status(400).send({ message: "Could not find user" });
		} else {
			// Adds otherID to user's blocklist
			user.blocked.push(otherID);
			await user.save();
			res.status(200).send(JSON.stringify({ userID: id }));
		}
	});
};

// Adds a 1-way or 2-way match, depending on the current relation between the two users
export const addMatch = (req, res, next) => {
	const id = req.params.id;
	const otherID = req.params.otherID;
	User.findOne({ id: id }, (err, user) => {
		if (err) {
			res.status(400).send({ message: err });
		} else if (!user) {
			res.status(400).send({ message: "Could not find user" });
		} else {
			User.findOne({ id: otherID }, async (innerErr, otherUser) => {
				if (innerErr) {
					res.status(400).send("Could not find other user");
				} else {
					// If the other user already has a one way match with the calling user, make a two way match
					if (otherUser.oneWayMatches.includes(id)) {
						otherUser.twoWayMatches.push(id);

						// Remove the calling user from other user's oneWayMatch list (it is now a twoWayMatch)
						const index = otherUser.oneWayMatches.indexOf(id);
						if (index > -1) {
							otherUser.oneWayMatches.splice(index, 1);
						}
						user.twoWayMatches.push(otherID);
						// Generate empty pastWorkouts entries for the two users
						otherUser.pastWorkouts.unshift({
							id: id,
							date: [],
							workoutTitle: [],
							workout: [],
							rating: "0",
						});
						user.pastWorkouts.unshift({
							id: otherID,
							date: [],
							workoutTitle: [],
							workout: [],
							rating: "0",
						});
						await otherUser.save();
					} else {
						// If the other user has one way match with the current user, add a oneWayMatch
						user.oneWayMatches.push(otherID);
					}
					await user.save();
					res.status(200).send(JSON.stringify({ userID: id }));
				}
			});
		}
	});
};
