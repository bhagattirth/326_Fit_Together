// import {  deleteUser } from "../helpers/matchHistoryHelper.js";
import {User} from "../app.js";


export const getPastUser = (req, res, next)=>{
    const {id} = req.params;
    
    User.findOne({id:"wqrlajf"}, (err, foundItem) =>{
		if(err){
            res.status(404).send({ message: err });
        }else if(!foundItem){
            res.status(400).send({ message: "User doesn't exist" })
        }else{
            res.status(200).send(JSON.stringify(foundItem.pastWorkouts))
        }
	});
};

export const addWorkoutToUser = (req, res, next) =>{

    const filter = {"$and": [{"id": "wqrlajf"}, {'pastWorkouts.id': "dsafag"}]};
    const update = {"$push": {"pastWorkouts.$.workout":["test"]}};

    User.findOneAndUpdate(filter, update, (err, foundItem) => { 
        if(err){
            res.status(404).send(err);
        }else if(!foundItem){
            res.status(400).send({ message: "Member doesn't exist" })
        }else{
            res.status(200).send({message:"Workouts has been been updated"});
        }
    });    
}

export const updateRating = (req, res, next) =>{

    const filter = {"$and": [{"id": "wqrlajf"}, {'pastWorkouts.id': "dsafag"}]};
    const update = {"$set": {"pastWorkouts.$.rating":"5"}};

    User.findOneAndUpdate(filter, update, (err, foundItem) => { 
        if(err){
            res.status(404).send(err);
        }else if(!foundItem){
            res.status(400).send({ message: "Member doesn't exist" })
        }else{
            res.status(200).send({message:"Rating has been been updated"});
        }
    });
}


export const deleteEntry = (req, res, next)=>{
    
    const filter = {"$and": [{"id": "wqjf"}, {'pastWorkouts.id': "dsafag"}]};
    const update = {"$pull": {"pastWorkouts":{id:"dsafag"}}};

    User.findOneAndUpdate(filter, update, (err, foundItem) => { 
        if(err){
            res.status(404).send(err);
        }else if(!foundItem){
            res.status(400).send({ message: "Member doesn't exist" })
        }else{
            res.status(200).send({message:" Member has been Deleted"});
        }
    });
}
