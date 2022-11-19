import fs from "fs";

const dummyArr = `[
	{
		"name": "Chris Bumstead",
		"contact": "987-010-575",
		"imgURL": "https://fitnessvolt.com/wp-content/uploads/2022/07/becoming-a-bodybuilder-750x422.jpg",
		"ratings": "4",
		"pastWorkout": [
			[
				"7/24/2025",
				"Legs",
				"quads",
				"squats",
				"wallsits",
				"leg-press",
				"10 mile run"
			],
			[
				"11/24/2025",
				"Arms",
				"Triceps",
				"Biceps",
				"curls",
				"Pushups",
				"Crunches",
				"Wallsits"
			]
		],
		"preference": ["Mondays", "Tuesday"],
		"lastWorkout": "7/24/2025"
	},
	{
		"name": "Arnold Cane",
		"contact": "587-911-817",
		"imgURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Arnold_Schwarzenegger_1974.jpg/800px-Arnold_Schwarzenegger_1974.jpg",
		"ratings": "5",
		"pastWorkout": [
			[
				"10/24/2025",
				"Back",
				"shoulders",
				"chest",
				"Benchpress",
				"Arm thrust"
			],
			[
				"12/10/2003",
				"Arms",
				"Triceps",
				"Biceps",
				"curls",
				"Pushups",
				"Crunches"
			]
		],
		"preference": ["Tuesday", "Saturday"],
		"lastWorkout": "10/24/2025"
	},
	{
		"name": "Anthony",
		"contact": "699-432-785",
		"imgURL": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/9b1b1f31-9234-4204-a991-f39d4fc68ed3/dcr8y69-e49c27cd-8e0d-4b96-8df7-a9bc239b50a7.jpg/v1/fill/w_771,h_1037,q_70,strp/gym_muscle_girl_by_hlol123_dcr8y69-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTk5NCIsInBhdGgiOiJcL2ZcLzliMWIxZjMxLTkyMzQtNDIwNC1hOTkxLWYzOWQ0ZmM2OGVkM1wvZGNyOHk2OS1lNDljMjdjZC04ZTBkLTRiOTYtOGRmNy1hOWJjMjM5YjUwYTcuanBnIiwid2lkdGgiOiI8PTE0ODIifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.9V-p4i21lESbeaBbgr1BIaPf_ImeIInW8b852MhatMg",
		"ratings": "3",
		"pastWorkout": [
			["10/22/2025", "Back", "shoulders", "chest", "pecks", "core"],
			["5/10/2003", "Arms", "Triceps", "Biceps", "wrist", "dumbell rolls"]
		],
		"preference": ["Monday", "Saturday", "Thursday"],
		"lastWorkout": "10/22/2025"
	},
	{
		"name": "Robert Dan",
		"contact": "999-010-575",
		"imgURL": "https://www.deccanherald.com/sites/dh/files/3_May%2028.jpg",
		"ratings": "3",
		"pastWorkout": [
			["7/24/2025", "Legs", "quads", "squats", "Sprints"],
			["11/24/2025", "Arms", "Triceps", "Biceps"]
		],
		"preference": ["Mondays", "Tuesday", "Friday"],
		"lastWorkout": "7/24/2025"
	},
	{
		"name": "Kyle Sans",
		"contact": "537-911-817",
		"imgURL": "https://img.freepik.com/premium-photo/handsome-man-standing-strong-gym-flexing-muscles-muscular-athletic-bodybuilder-fitness_286419-155.jpg?w=2000",
		"ratings": "2",
		"pastWorkout": [
			[
				"10/24/2025",
				"Back",
				"shoulders",
				"chest",
				"Back press",
				"deltoids"
			],
			["12/10/2003", "Arms", "Triceps", "Biceps"]
		],
		"preference": ["Tuesday", "Saturday", "Friday"],
		"lastWorkout": "10/24/2025"
	},
	{
		"name": "Drake Can",
		"contact": "459-432-785",
		"imgURL": "https://as1.ftcdn.net/v2/jpg/02/82/11/20/1000_F_282112090_jmU68ERtvNIVNAOj6jFS8tObAmOsMu6v.jpg",
		"ratings": "3",
		"pastWorkout": [
			[
				"10/22/2025",
				"Back",
				"shoulders",
				"chest",
				"pecks",
				"Deltoids",
				"Pullups"
			],
			["5/10/2003", "Arms", "Triceps", "Biceps", "wrist", "wall push"]
		],
		"preference": ["Monday", "Saturday", "Sunday"],
		"lastWorkout": "10/22/2025"
	}
]
`;
export function getPastData() {
	const raw = fs.readFileSync("./public/dummyEntries.json");
	const json = JSON.parse(raw);
	// const json = JSON.parse(dummyArr);
	return json;
}

export function addWorkout(user, workout, date, type) {
	let mini = [];
	mini.push(date);
	mini.push(type);
	const raw = fs.readFileSync("./public/dummyEntries.json");
	const json = JSON.parse(raw);
	let userData = json.find((e) => e.name === user);
	let list = workout.replace(/ /g, "").split(",");
	mini.push(...list);
	userData.pastWorkout.push(mini);
	fs.writeFileSync("./public/dummyEntries.json", JSON.stringify(json));
}

export function ratingUpdate(user, rating) {
	const raw = fs.readFileSync("./public/dummyEntries.json");
	const json = JSON.parse(raw);
	let userData = json.find((e) => e.name === user);
	userData.ratings = rating;
	fs.writeFileSync("./public/dummyEntries.json", JSON.stringify(json));
}

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
