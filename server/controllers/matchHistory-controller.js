import { addWorkout, getXPastData, ratingUpdate, deleteUser, getDays } from "../helpers/matchHistoryHelper.js";


export const getXPastUser =  (req, res, next)=>{
    const {number} = req.params;
    res.send(JSON.stringify(getXPastData(Number(number)))); 
};

export const addWorkoutToUser = (req, res, next) =>{
    const {workout1} = req.body;
    const {workout2} = req.body;
    const {workout3} = req.body;

    if(workout1 !=null && workout1 !== ""){
        let list = workout1.replace(/ /g, '').split(",");
        let modifyUserData = addWorkout(1, list);
        
        res.json(modifyUserData);
    }

    else if(workout2 !=null && workout2 !== ""){
        let list = workout2.replace(/ /g, '').split(",");
        let modifyUserData = addWorkout(2, list);
        res.json(modifyUserData);
    }
    else if(workout3 !=null && workout3 !== ""){
        let list = workout3.replace(/ /g, '').split(",");
        let modifyUserData = addWorkout(3, list);
        res.json(modifyUserData);
    }
}



export const updateRating = (req, res, next) =>{

    const {ratingVal1} = req.body;
    const {ratingVal2} = req.body;
    const {ratingVal3} = req.body;

    if(ratingVal1 !=null){
        let modifyUserData = ratingUpdate(1, ratingVal1);
        res.json(modifyUserData);
    }

    else if(ratingVal2 !=null){
        let modifyUserData = ratingUpdate(2, ratingVal2);
        res.json(modifyUserData);
    }
    else if(ratingVal3 !=null){
        let modifyUserData = ratingUpdate(3, ratingVal3);
        res.json(modifyUserData);
    }
}


export const deleteEntry = (req, res, next)=>{
    
    const {removeMatch1} = req.body;
    const {removeMatch2} = req.body;
    const {removeMatch3} = req.body;

    if(removeMatch1 !=null){
        let modifyUserData = deleteUser(removeMatch1);
        res.json(modifyUserData);
    }

    else if(removeMatch2 !=null){
        let modifyUserData = deleteUser(removeMatch2);
        res.json(modifyUserData);
    }
    else if(removeMatch3 !=null){
        let modifyUserData = deleteUser(removeMatch3);
        res.json(modifyUserData);
    } 
}

export const getPreference = (req, res, next)=>{
    
    const {preferences1} = req.query;
    const {preferences2} = req.query;
    const {preferences3} = req.query;

    console.log(req.query);
    if(preferences1 !=null){
        let data = getDays(preferences1);
        res.json(data);
    }

    else if(preferences2 !=null){
        let data = getDays(preferences2);
        res.json(data);
    }
    else if(preferences3 !=null){
        let data = getDays(preferences3);
        res.json(data);
    } 

}