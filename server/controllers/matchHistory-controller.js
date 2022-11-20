// import {  deleteUser } from "../helpers/matchHistoryHelper.js";
import {User} from "../app.js";


export const getPastUser = (req, res, next)=>{
    const userId = req.params.id;
    
    User.findOne({id:"wqrlajf"}, (err, foundItem) =>{
		if(err){
            res.status(404).send({ message: err });
        }else if(!foundItem){
            res.status(400).send({ message: "User doesn't exist" });
        }else{
            res.status(200).send(JSON.stringify(foundItem.pastWorkouts));
        }
	});
};

export const getProfileInfo = (req, res, next)=>{
    const userId = req.params.id;
    
    User.findOne({id:"wqrlajf"}, (err, foundItem) =>{
		if(err){
            res.status(404).send({ message: err });
        }else if(!foundItem){
            res.status(400).send({ message: "User doesn't exist" });
        }else{
            const info = {
                imgURL:foundItem.profilePic, name:foundItem.fName + " " + foundItem.lName,
                preference:foundItem.prefDays, email:foundItem.email
            };
            res.status(200).send(JSON.stringify(info));
        }
	});
};


export const addWorkoutToUser = (req, res, next) =>{

    const {user, member, dates, type} = req.body;
    let workout = req.body.workout;
    const list = workout.replace(/ /g, " ").split(",");
    const filter = {"$and": [{"id": "wqrlajf"}, {'pastWorkouts.id': "dsafag"}]};
    const update = {"$push": {"pastWorkouts.$.workout":list, "pastWorkouts.$.workoutTitle":type, "pastWorkouts.$.date":dates}};
    
    User.findOneAndUpdate(filter, update, (err, foundItem) => { 
        if(err){
            res.status(404).send(err);
        }else if(!foundItem){
            res.status(400).send({ message: "Member doesn't exist" });
        }else{
            res.status(200).send({message:"Workouts has been been updated"});
        }
    });    
}

export const updateRating = (req, res, next) =>{

    const {user, member, rating} = req.body;
    const filter = {"$and": [{"id": "wqrlajf"}, {'pastWorkouts.id': "dsafag"}]};
    const update = {"$set": {"pastWorkouts.$.rating": rating}};

    User.findOneAndUpdate(filter, update, (err, foundItem) => { 
        if(err){
            res.status(404).send(err);
        }else if(!foundItem){
            res.status(400).send({ message: "Member doesn't exist" });
        }else{
            res.status(200).send({message:"Rating has been been updated"});
        }
    });
}


export const deleteEntry = (req, res, next)=>{
    
    const {user, member} = req.body;
    const filter = {"$and": [{"id": "wqjf"}, {'pastWorkouts.id': "dsafag"}]};
    const update = {"$pull": {"pastWorkouts":{id:"dsafag"}}};

    User.findOneAndUpdate(filter, update, (err, foundItem) => { 
        if(err){
            res.status(404).send(err);
        }else if(!foundItem){
            res.status(400).send({ message: "Member doesn't exist" });
        }else{
            res.status(200).send({message:" Member has been Deleted"});
        }
    });
}
