import User from "../app.js";

export const findPotentialMatches = (req, res, next) => {
	const id = req.params.id;
	User.findOne({ id: id }, (err, user) => {
		if (err) {
			res.status(400).send();
		} else {
			User.find(
				{
					$or: [
						{ id: { $nin: user.blocked } },
						{ id: { $nin: user.oneWayMatches } },
						{ id: { $nin: user.twoWayMatches } },
					],
				},
				(err, usersArr) => {
					const potentialMatches = {};
					if (err) {
						// Send an empty array if there are no potential matches
						res.status(200).send([potentialMatches]);
					}
					for (const curUser of usersArr) {
						potentialMatches[curUser.id] = {
							firstName: curUser.fName,
							lastName: curUser.lName,
							phoneNumber: curUser.phoneNumber,
							workoutStyle: curUser.workoutStyle,
							averageWorkoutLength: curUser.averageWorkoutLength,
							startTime: curUser.startTime,
							endTime: curUser.endTime,
							preferredDays: curUser.prefDays,
						};
					}
					res.status(200).send(potentialMatches);
				}
			);
		}
	});
};

export const addToBlockList = (res, req, next) => {
	const id = req.params.id;
	const otherID = req.params.id;
	User.findOne({ id: id }, async (err, user) => {
		if (err) {
			res.status(400).send();
		} else {
			user.blocked.add(otherID);
			await user.save();
			res.status(200).send(id);
		}
	});
};

export const addMatch = (res, req, next) => {
	const id = req.params.id;
	const otherID = req.params.id;
	User.findOne({ id: id }, (err, user) => {
		if (err) {
			res.status(400).send("Could not find user");
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
						await otherUser.save();
					} else {
						user.oneWayMatches.push(otherID);
					}
					await user.save();
					res.status(200).send(id);
				}
			});
		}
	});
};
