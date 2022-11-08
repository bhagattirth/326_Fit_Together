import fs from 'fs';


export function getXPastData(number){
    
    const raw = fs.readFileSync("./public/dummyEntries.json");
    
    const json = JSON.parse(raw);
    let list = [];
    for(let i=0; i<number; i++){
        list.push(json[i]);
    }
    return list;   
}

export function addWorkout(number, workout){

    const raw = fs.readFileSync("./public/dummyEntries.json");
    const json = JSON.parse(raw);
    let user = json[number-1];
    user.pastWorkout.push(workout);
    fs.writeFileSync("./public/dummyEntries.json", JSON.stringify(json));
    return json;

}

export function ratingUpdate(number, rating){

    const raw = fs.readFileSync("./public/dummyEntries.json");
    const json = JSON.parse(raw);
    let user = json[number-1];
    user.ratings = rating;
    fs.writeFileSync("./public/dummyEntries.json", JSON.stringify(json));
    return json;
}

export function deleteUser(arg){
    arg = Number(arg.substring(1,2));
    const raw = fs.readFileSync("./public/dummyEntries.json");
    const json = JSON.parse(raw);
    let newJson = json.splice(arg-1,arg);
    fs.writeFileSync("./public/dummyEntries.json", JSON.stringify(newJson));
    return json;
}


export function getDays(arg){

    arg = arg.substring(arg.length-1, arg.length);
    const raw = fs.readFileSync("./public/dummyEntries.json");
    const json = JSON.parse(raw);
    let user = json[Number(arg)-1];
    return user.preference;
}