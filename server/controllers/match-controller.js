import { User } from "../app.js";

export const findPotentialMatches = (req, res, next) => {
	const id = req.params.id;
	User.findOne({ id: id }, (err, user) => {
		if (err) {
			res.status(400).send({ message: err });
		} else if (!user) {
			res.status(400).send({ message: "Couldn't find user" });
		} else {
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
						potentialMatches[curUser.id] = {
							profileImage: curUser.profilePic,
							profile: {
								firstName: curUser.fName,
								lastName: curUser.lName,
								phoneNumber: curUser.phoneNumber,
								workoutStyle: curUser.workoutStyle,
								averageWorkoutLength:
									curUser.averageWorkoutLength,
								startTime: curUser.startTime,
								endTime: curUser.endTime,
								preferredDays: curUser.prefDays,
							},
						};
					}
					res.status(200).send(JSON.stringify(potentialMatches));
				}
			);
		}
	});
};

export const addToBlockList = (req, res, next) => {
	const id = req.params.id;
	const otherID = req.params.otherID;
	console.log(id);
	User.findOne({ id: id }, async (err, user) => {
		if (err) {
			res.status(400).send({ message: err });
		} else if (!user) {
			res.status(400).send({ message: "Could not find user" });
		} else {
			user.blocked.push(otherID);
			await user.save();
			res.status(200).send(JSON.stringify({ userID: id }));
		}
	});
};

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
					if (otherUser.oneWayMatches.includes(id)) {
						otherUser.twoWayMatches.push(id);
						const index = otherUser.oneWayMatches.indexOf(id);
						if (index > -1) {
							otherUser.oneWayMatches.splice(index, 1);
						}
						user.twoWayMatches.push(otherID);
						otherUser.pastWorkouts.push({
							id: id,
							date: [],
							workoutTitle: [],
							workout: [],
							rating: "0",
						});
						user.pastWorkouts.push({
							id: otherID,
							date: [],
							workoutTitle: [],
							workout: [],
							rating: "0",
						});
						await otherUser.save();
					} else {
						user.oneWayMatches.push(otherID);
					}
					await user.save();
					res.status(200).send(JSON.stringify({ userID: id }));
				}
			});
		}
	});
};
