import { addWorkout, ratingUpdate, deleteUser, getPastData } from "../helpers/matchHistoryHelper.js";



export const getPastUser =  (req, res, next)=>{
    res.status(200).send(JSON.stringify(getPastData())); 
};

export const addWorkoutToUser = (req, res, next) =>{
   
    const {user, workout, dates, type} = req.body
    let outcome = addWorkout(user,workout, dates, type);

    if (outcome ===-1){
        res.send({message:"Workouts has not been updated"});
    }
    else{
        res.send({message:"Workouts has been updated"});
    }
}



export const updateRating = (req, res, next) =>{

    const {user, rating} = req.body;
    let outcome = ratingUpdate(user,rating);
    if (outcome ===-1){
        res.send({message:"Rating has not been updated"});
    }
    else{
        res.send({message:"Rating has been updated"});
    }
}


export const deleteEntry = (req, res, next)=>{
    
    const {user} = req.body;

    let outcome = deleteUser(user);
    if (outcome ===-1){
        res.send({message:"Rating has not been updated"});
    }
    else{
        res.send({message:"Rating has been updated"});
    }
}
