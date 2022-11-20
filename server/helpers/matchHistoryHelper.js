import fs from "fs";



// export function addWorkout(user, workout, date, type) {
// 	let mini = [];
// 	mini.push(date);
// 	mini.push(type);
// 	const raw = fs.readFileSync("./public/dummyEntries.json");
// 	const json = JSON.parse(raw);
// 	let userData = json.find((e) => e.name === user);
// 	let list = workout.replace(/ /g, "").split(",");
// 	mini.push(...list);
// 	userData.pastWorkout.push(mini);
// 	fs.writeFileSync("./public/dummyEntries.json", JSON.stringify(json));
// }

// export function ratingUpdate(user, rating) {
// 	const raw = fs.readFileSync("./public/dummyEntries.json");
// 	const json = JSON.parse(raw);
// 	let userData = json.find((e) => e.name === user);
// 	userData.ratings = rating;
// 	fs.writeFileSync("./public/dummyEntries.json", JSON.stringify(json));
//}

export function deleteUser(user) {
	const raw = fs.readFileSync("./public/dummyEntries.json");
	const json = JSON.parse(raw);
	for (let i = 0; i < json.length; i++) {
		if (user === json[i].name) {
			json.splice(i, 1);
		}
	}
	fs.writeFileSync("./public/dummyEntries.json", JSON.stringify(json));
}
