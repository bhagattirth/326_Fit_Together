import { User } from "../app.js";

export const getPastUser = (req, res, next) => {
	const userId = req.params.id;
	const returnField = {
		pastWorkouts:1
	}
	
	User.findOne({ id: userId }, returnField, (err, foundItem) => {
		if (err) {
			res.status(404).send({ message: err });
			return;
		} else if (!foundItem) {
			res.status(400).send({ message: "User doesn't exist" });
			return;
		} else {
			res.status(200).send(JSON.stringify(foundItem.pastWorkouts));
			return;
		}
	});
};

export const getProfileInfo = (req, res, next) => {
	const userId = req.params.id;
	const returnField = {
		profilePic: 1,
		fName: 1,
		lName: 1,
		prefDays: 1,
		email: 1,
		phoneNumber: 1,
		startTime: 1,
		endTime: 1
	}

	User.findOne({ id: userId }, returnField, (err, foundItem) => {
		if (err) {
			res.status(404).send({ message: err });
			return;
		} else if (!foundItem) {
			res.status(400).send({ message: "User doesn't exist" });
			return;
		} else {
			const info = {
				imgURL: foundItem.profilePic,
				name: foundItem.fName + " " + foundItem.lName,
				preference: foundItem.prefDays,
				email: foundItem.email,
				phone: foundItem.phoneNumber,
				startTime: foundItem.startTime,
				endTime: foundItem.endTime
			};
			res.status(200).send(JSON.stringify(info));
			return;
		}
	});
};

export const addWorkoutToUser = (req, res, next) => {
	const { user, member, dates, type } = req.body;
	console.log(user, member);
	let workout = req.body.workout;
	const list = workout.replace(/ /g, " ").split(",");
	const filter = {
		$and: [
			{ id: user.toString() },
			{ "pastWorkouts.id": member.toString() },
		],
	};
	const update = {
		$push: {
			"pastWorkouts.$.workout": list,
			"pastWorkouts.$.workoutTitle": type,
			"pastWorkouts.$.date": dates,
		},
	};

	User.findOneAndUpdate(filter, update, (err, foundItem) => {
		if (err) {
			res.status(404).send(err);
			return;
		} else if (!foundItem) {
			res.status(400).send({ message: "Member doesn't exist" });
			return;
		} else {
			res.status(200).send({ message: "Workouts has been been updated" });
			return;
		}
	});
};

export const updateRating = (req, res, next) => {
	const { user, member, rating } = req.body;
	const filter = {
		$and: [
			{ id: user.toString() },
			{ "pastWorkouts.id": member.toString() },
		],
	};
	const update = { $set: { "pastWorkouts.$.rating": rating } };

	User.findOneAndUpdate(filter, update, async(err, foundItem) => {
		if (err) {
			res.status(404).send(err);
			return;
		} else if (!foundItem) {
			res.status(400).send({ message: "Member doesn't exist" });
			return;
		} else {
			if (await updateAverageRating(member.toString()) === -1) {
				res.status(404).send({message:"Cannot update average rating"});
			}else{
				res.status(200).send({ message: "Ratings has been been updated" });
			}	
		}
	});
};

export const deleteEntry = (req, res, next) => {
	const { user, member } = req.body;
	const filter = {
		$and: [
			{ id: user.toString() },
			{ "pastWorkouts.id": member.toString() },
		],
	};
	const update = { $pull: { pastWorkouts: { id: member.toString() } } };

	User.findOneAndUpdate(filter, update, async(err, foundItem) => {
		if (err) {
			res.status(404).send(err);
			return;
		} else if (!foundItem) {
			res.status(400).send({ message: "Member doesn't exist" });
			return;
		} else {
			removeFromTwoWayMatch(user.toString(), member.toString());
			removeFromTwoWayMatch(member.toString(), user.toString());
			foundItem.blocked.push(member.toString());
			await foundItem.save();
			res.status(200).send({ message: " Member has been Deleted" });
			return;
		}
	});
};


function removeFromTwoWayMatch(userId, otherId) {
	const filter = { id: userId };
	const returnField = { twoWayMatches: 1};

	User.findOne(filter, returnField, async (err, foundItem) => {
		if (err) {
			return;
		} else {
			const index = foundItem.twoWayMatches.indexOf(otherId);
			if(index > -1){
				foundItem.twoWayMatches.splice(index, 1);
			}
			await foundItem.save();
		}
	});
}

async function updateAverageRating(id){
	const newRatingInfo = await calculateAverageRating(id);
	const filter = { id: id};
	const update = {
		rating: newRatingInfo[0],
		numberOfRatings: newRatingInfo[1]
	};

	if(newRatingInfo[0] > -1){
		try {
			await User.updateOne(filter, update);
		} catch (err) {
			console.log(err);
			return -1;
		}	
		return 1;
	}else{
		return -1;
	}

}

async function calculateAverageRating(id){
	let sum = 0;
	let numberOfReviews = 0;
	const filter = { "pastWorkouts.id": id};
	const map = {"1":1, "2":2, "3":3, "4":4, "5":5};
	try {
	   const foundItems = await User.find(filter);
	   for(const foundUser of foundItems){
			const index = foundUser.pastWorkouts.findIndex(x => x.id === id);
			if(index > -1){
				const stringRating = foundUser.pastWorkouts[index].rating;
				if(stringRating !== "0"){
					sum += map[stringRating];
					numberOfReviews += 1;
				}
			}
		}
		const average = numberOfReviews === 0? 0: Math.round(sum/numberOfReviews *100)/ 100; 
		console.log(average)
		return [average, numberOfReviews];
	} catch(err) {
		console.log(err);
		return [-1, -1];
	}
}
