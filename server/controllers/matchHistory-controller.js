import { User } from "../app.js";

//Used to get the past workouts array from the user
export const getPastUser = (req, res, next) => {
	const userId = req.params.id;
	// The things we want returned from the database
	const returnField = {
		pastWorkouts:1
	}
	
	//Looks for the user with the id and returns the pastworkout array
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

//Gets members info that will be displayed on match history
export const getProfileInfo = (req, res, next) => {
	const userId = req.params.id;
	//The member information that we want to retrieve
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
	//Finds the user and retrieves the needed info and sends it to client side
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

//Adds workout user workout list with a member in pastwork array
export const addWorkoutToUser = (req, res, next) => {
	//the user, the member, workout date, workout type
	const { user, member, dates, type } = req.body;
	//workouts string
	let workout = req.body.workout;
	//Turns the workout string into a list of workouts by spliting on commas
	const list = workout.replace(/ /g, " ").split(",");
	//The Users pastworkout array we are modifying
	const filter = {
		$and: [
			{ id: user.toString() },
			{ "pastWorkouts.id": member.toString() },
		],
	};

	//Adding the workout arrays for a member in the pastworkout array of the user
	const update = {
		$push: {
			"pastWorkouts.$.workout": list,
			"pastWorkouts.$.workoutTitle": type,
			"pastWorkouts.$.date": dates,
		},
	};

	//Finds the user and updates pastworkout stuff
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

//Updates user's rating for the other member as well as updating the average rating for the other member
export const updateRating = (req, res, next) => {
	const { user, member, rating } = req.body;
	const filter = {
		$and: [
			{ id: user.toString() },
			{ "pastWorkouts.id": member.toString() },
		],
	};
	//Updating the users rating that for that member in pastworkout
	const update = { $set: { "pastWorkouts.$.rating": rating } };

	//Update user's rating for that member
	User.findOneAndUpdate(filter, update, async(err, foundItem) => {
		if (err) {
			res.status(404).send(err);
			return;
		} else if (!foundItem) {
			res.status(400).send({ message: "Member doesn't exist" });
			return;
		} else {
			//Once user's rating updated for that member, we update the average rating of the member
			if (await updateAverageRating(member.toString()) === -1) {
				res.status(404).send({message:"Cannot update average rating"});
			}else{
				res.status(200).send({ message: "Ratings has been been updated" });
			}	
		}
	});
};

//Deletes member entry from the pastwork array of the user and removes from two way array 
//and blocks the member for that user
export const deleteEntry = (req, res, next) => {
	const { user, member } = req.body;
	const filter = {
		$and: [
			{ id: user.toString() },
			{ "pastWorkouts.id": member.toString() },
		],
	};
	//Removes entry from the pastwork array that contains the member's id
	const update = { $pull: { pastWorkouts: { id: member.toString() } } };

	//Removes the member entry from the user's pastworkout array
	User.findOneAndUpdate(filter, update, async(err, foundItem) => {
		if (err) {
			res.status(404).send(err);
			return;
		} else if (!foundItem) {
			res.status(400).send({ message: "Member doesn't exist" });
			return;
		} else {
			//Once deleted from pastworkout, we need to update two way array
			removeFromTwoWayMatch(user.toString(), member.toString());
			removeFromTwoWayMatch(member.toString(), user.toString());
			//We add the removed member into the blocked array so they won't be matched again
			foundItem.blocked.push(member.toString());
			await foundItem.save();
			res.status(200).send({ message: " Member has been Deleted" });
			return;
		}
	});
};

// Removes member id from the user's two way match array
function removeFromTwoWayMatch(userId, otherId) {
	const filter = { id: userId };
	const returnField = { twoWayMatches: 1};

	//Finds the the user with the id
	User.findOne(filter, returnField, async (err, foundItem) => {
		if (err) {
			return;
		} else {
			//Once found, we remove the member's id from the two way match array
			const index = foundItem.twoWayMatches.indexOf(otherId);
			if(index > -1){
				foundItem.twoWayMatches.splice(index, 1);
			}
			await foundItem.save();
		}
	});
}

//Updates the average rating for that member
async function updateAverageRating(id){
	//calulates the new average rating of the user
	const newRatingInfo = await calculateAverageRating(id);
	const filter = { id: id};
	//Updates member's rating and the number of people that have rated him
	const update = {
		rating: newRatingInfo[0],
		numberOfRatings: newRatingInfo[1]
	};

	//Checks if there wasn't a error return by the calculation
	if(newRatingInfo[0] > -1){
		try {
			//Updates the members rating and number of revies
			await User.updateOne(filter, update);
		} catch (err) {
			//returns -1 if something went wrong
			console.log(err);
			return -1;
		}
		//Returns 1 if it was success
		return 1;
	}else{
		return -1;
	}

}

//Calcalates the new average rating for the user
async function calculateAverageRating(id){
	//Used to calcuate the average
	let sum = 0;
	let numberOfReviews = 0;

	//Gets all the people that workout with this member
	const filter = { "pastWorkouts.id": id};
	const map = {"1":1, "2":2, "3":3, "4":4, "5":5};

	try {
	   //Gets all users that match the filter
	   const foundItems = await User.find(filter);
	   //we itterate through all the users that workout out with this member
	   for(const foundUser of foundItems){
			//We look in the pastworkout array to find the member entry inside of it
			const index = foundUser.pastWorkouts.findIndex(x => x.id === id);
			if(index > -1){
				//Once we locate the entry, we take the the user rating given to the member
				const stringRating = foundUser.pastWorkouts[index].rating;
				//We only care about ratings that the user gives, 0 is set by default
				if(stringRating !== "0"){
					//We aggregate sum and number of Reviews
					sum += map[stringRating];
					numberOfReviews += 1;
				}
			}
		}
		//Once go through all, we calcalate average and round the the 2 decimal points
		const average = numberOfReviews === 0? 0: Math.round(sum/numberOfReviews *100)/ 100; 
		//we return the average, and the number of reviews of the member
		return [average, numberOfReviews];
	} catch(err) {
		console.log(err);
		//Represents that there was an error
		return [-1, -1];
	}
}
