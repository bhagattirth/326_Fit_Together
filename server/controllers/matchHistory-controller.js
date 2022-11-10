import { addWorkout, ratingUpdate, deleteUser, getPastData } from "../helpers/matchHistoryHelper.js";



export const getPastUser =  (req, res, next)=>{
    res.status(200).send(JSON.stringify(getPastData())); 
};

export const addWorkoutToUser = (req, res, next) =>{
   
    const {user, workout, dates, type} = req.body
    addWorkout(user,workout, dates, type);
   
    res.status(200).send({message:"Workouts has been been updated"});
}



export const updateRating = (req, res, next) =>{

    const {user, rating} = req.body;
    ratingUpdate(user,rating);
 
    res.status(200).send({message:"Rating has been updated"});
}


export const deleteEntry = (req, res, next)=>{
    
    const {user} = req.body;
    deleteUser(user);
    res.status(200).send({message:"Rating has not been updated"});
    
}
