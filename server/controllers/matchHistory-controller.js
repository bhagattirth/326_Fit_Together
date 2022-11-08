import { addWorkout, getXPastData, ratingUpdate } from "../helpers/matchHistoryHelper.js";


export const getXPastUser =  (req, res, next)=>{
    const {number} = req.params;
    res.json(getXPastData(Number(number))); 
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

    
    //Will finish later

}