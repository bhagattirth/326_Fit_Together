import user from "./user.js";
const urlBase = "https://ufit12.herokuapp.com";
let userMap = { user1: null, user2: null, user3: null };
let firstEntryOnPage = 0;
let lastEntryOnPage = 2;
let jsonSize = 0;
const profilePictureImage = document.getElementById("profilePicture");

await validateUser();

async function validateUser() {
	const res = await fetch(`${urlBase}/auth/validateUser`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	// if not valid, return
	if (!res.ok) {
		alert("Issue finding profile information");
	}
	const msg = await res.json();
	// update user id here
	user.setUserId(msg.id);
}
console.log(user.getUserId());

setProfilePicture(user.getUserId());

async function setProfilePicture(id) {
	try {
		const res = await fetch(`${urlBase}/profile/${id}/picture`, {
			method: "GET",
			credentials: "include",
		});
		if (!res.ok || res.status === 400) {
			throw new Error("Something went wrong please try again later");
		}
		const msg = await res.json();
		profilePictureImage.src = msg.profilePic;
	} catch (err) {
		alert("Profile Picture could not be retrieved");
		return;
	}
}

const loadUsers = async (id) => {
	let json = null;
	try {
		const res = await fetch(`${urlBase}/matchHistory/${id}/getPast`, {
			method: "GET",
			credentials: "include",
		});
		json = await res.json();

		if (!res.ok) {
			throw new Error("Something went wrong please try again later");
		}
	} catch (err) {
		alert("Past users could not be retrieved");
		return;
	}

	userMap = { user1: null, user2: null, user3: null };

	jsonSize = json.length;

	let count = 1;
	let i = firstEntryOnPage;
	while (i <= lastEntryOnPage && i < json.length) {
		const userInfo = await getUserInfo(json[i].id);

		userMap["user" + count] = json[i].id;
		addProfileInfo(userInfo, count);
		createCarousel(json[i], count);
		showRating(json[i], count);
		i++;
		count++;
	}
	console.log(userMap);
	displayUser();
};

async function getUserInfo(id) {
	try {
		const res = await fetch(
			`${urlBase}/matchHistory/${id}/getProfileInfo`,
			{
				method: "GET",
				credentials: "include",
			}
		);
		const msg = await res.json();

		if (!res.ok) {
			throw new Error("Cannot retrieve Profile");
		} else {
			return msg;
		}
	} catch (err) {
		return null;
	}
}

function addProfileInfo(userData, i) {
	let profileInfo = document.getElementById("profile" + i);
	let profilePic = document.getElementById("profilePic" + i);
	let prefDate = document.getElementById("prefDate" + i);
	let name = document.createElement("SPAN");

	name.classList.add("prev-matches-name");
	name.innerHTML = userData.name;

	profileInfo.innerHTML = "";
	profileInfo.appendChild(name);
	profileInfo.innerHTML += "</br>";
	// profileInfo.innerHTML+= "Last Workout On: " + userData.lastWorkout;
	profileInfo.innerHTML += "</br>";
	profileInfo.innerHTML += "Contact: " + userData.email;
	profilePic.src = userData.imgURL;

	prefDate.innerText = "";
	prefDate.innerText = userData.preference;

	// for(let days of userData.preference){
	//     prefDate.innerText+= days + " ";
	// }
}

function createCarousel(pastWorkouts, i) {
	const workouts = pastWorkouts.workout;
	const workoutTitles = pastWorkouts.workoutTitle;
	const workoutDates = pastWorkouts.date;

	let carousel = document.getElementById("carousel" + i);
	carousel.innerHTML = "";
	let carouselBody = document.createElement("div");
	carouselBody.classList.add("carousel-inner", "border-2");

	let isFirst = true;

	for (let i in workouts) {
		createWorkoutCard(
			workouts[i],
			workoutTitles[i],
			workoutDates[i],
			carouselBody,
			isFirst
		);
		isFirst = false;
	}

	//Buttons
	let leftButton = document.createElement("button");
	leftButton.classList.add("carousel-control-prev", "carousel-arrow-color");
	setAttributes(leftButton, {
		type: "button",
		"data-bs-target": "#carousel" + i,
		"data-bs-slide": "prev",
	});

	let spanIcon = document.createElement("SPAN");
	spanIcon.classList.add("carousel-control-prev-icon");
	spanIcon.setAttribute("aria-hidden", "true");

	let spanIcon2 = document.createElement("SPAN");
	spanIcon2.classList.add("visually-hidden");
	spanIcon2.innerText = "Previous";

	leftButton.appendChild(spanIcon);
	leftButton.appendChild(spanIcon2);

	let rightButton = document.createElement("button");
	rightButton.classList.add("carousel-control-next");
	setAttributes(rightButton, {
		type: "button",
		"data-bs-target": "#carousel" + i,
		"data-bs-slide": "next",
	});

	let spanIconR = document.createElement("SPAN");
	spanIconR.classList.add("carousel-control-next-icon");
	spanIconR.setAttribute("aria-hidden", "true");

	let spanIcon2R = document.createElement("SPAN");
	spanIcon2R.classList.add("visually-hidden");
	spanIcon2.innerText = "Next";

	rightButton.appendChild(spanIconR);
	rightButton.appendChild(spanIcon2R);

	carouselBody.appendChild(leftButton);
	carouselBody.appendChild(rightButton);
	carousel.appendChild(carouselBody);
}

function getNextPage() {
	if (lastEntryOnPage + 1 < jsonSize) {
		firstEntryOnPage = firstEntryOnPage + 3;
		lastEntryOnPage = lastEntryOnPage + 3;
		loadUsers(user.getUserId());
	}
}

function prevPage() {
	if (0 < lastEntryOnPage - 3) {
		firstEntryOnPage = firstEntryOnPage - 3;
		lastEntryOnPage = lastEntryOnPage - 3;
		loadUsers(user.getUserId());
	}
}

function createWorkoutCard(exercises, title, date, cBody, isFirst) {
	let carouselItem = document.createElement("div");
	isFirst
		? carouselItem.classList.add("carousel-item", "active")
		: carouselItem.classList.add("carousel-item");

	let card = document.createElement("div");
	card.classList.add("card");

	let cardBody = document.createElement("div");
	card.classList.add("card-body");

	let cardTitle = document.createElement("h3");
	cardTitle.classList.add("card-title");
	cardTitle.innerHTML = date;
	cardBody.appendChild(cardTitle);

	let boldText = document.createElement("strong");
	boldText.innerHTML = title + ":";
	cardBody.appendChild(boldText);

	let exerciseText = document.createElement("p");
	exerciseText.classList.add("card-text");

	for (let i = 0; i < exercises.length; i++) {
		exerciseText.innerHTML += exercises[i] + "</br>";
	}

	cardBody.appendChild(exerciseText);
	card.appendChild(cardBody);
	carouselItem.appendChild(card);
	cBody.appendChild(carouselItem);
}

function showRating(userData, i) {
	let dropDown = document.getElementById("selectRating" + i);
	dropDown.innerHTML = "";

	["1/5", "2/5", "3/5", "4/5", "5/5"].forEach(function (e) {
		let option = document.createElement("option");
		option.setAttribute("value", e.substring(0, 1));
		option.innerText = e;

		if (e.substring(0, 1) === userData.rating) {
			option.selected = true;
		}

		dropDown.appendChild(option);
	});
}

function setAttributes(el, attrs) {
	for (var key in attrs) {
		el.setAttribute(key, attrs[key]);
	}
}

const addWorkoutListner = (i) => async () => {
	let workouts = document.getElementById("workout" + i).value;
	let date = document.getElementById("date" + i).value;
	let wType = document.getElementById("wType" + i).value;

	if (
		workouts === "" ||
		date === "" ||
		wType === "" ||
		!date.match(/^\d{2}[./-]\d{2}[./-]\d{4}$/)
	) {
		alert("Please Fill in the Fields Correctly");
	} else {
		const res = await fetch(`${urlBase}/matchHistory/addWorkout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},

			body: JSON.stringify({
				user: user.getUserId(),
				member: userMap["user" + i],
				workout: workouts,
				dates: date,
				type: wType,
			}),
		});
		const msg = await res.json();

		if (!res.ok) {
			alert("Failed to Add Workout");
		} else {
			loadUsers(user.getUserId());
		}
	}
};

const updateRatingListiner = (i) => async () => {
	let newRating = document.getElementById("selectRating" + i).value;
	const res = await fetch(`${urlBase}/matchHistory/ratingUpdate`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			user: user.getUserId(),
			member: userMap["user" + i],
			rating: newRating,
		}),
	});
	const msg = await res.json();

	if (!res.ok) {
		alert("Failed to Update Rating. Please Try Again Later");
	}
};

const deleteUserListiner = (i) => async () => {
	let userI = "user" + i;

	const res = await fetch(`${urlBase}/matchHistory/deleteEntry`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			user: user.getUserId(),
			member: userMap[userI],
		}),
	});
	const msg = await res.json();

	if (!res.ok) {
		alert("Failed to Delete Member Info");
	} else {
		loadUsers(user.getUserId());
	}
};

function displayUser() {
	if (userMap["user1"] !== null) {
		document.getElementById("previousMatchesOne").style.display = "";
	} else {
		document.getElementById("previousMatchesOne").style.display = "none";
	}

	if (userMap["user2"] !== null) {
		document.getElementById("previousMatchesTwo").style.display = "";
	} else {
		document.getElementById("previousMatchesTwo").style.display = "none";
	}

	if (userMap["user3"] !== null) {
		document.getElementById("previousMatchesThree").style.display = "";
	} else {
		document.getElementById("previousMatchesThree").style.display = "none";
	}
}

loadUsers(user.getUserId());

document
	.getElementById("updateRating1")
	.addEventListener("click", updateRatingListiner(1));
document.getElementById("add1").addEventListener("click", addWorkoutListner(1));
document
	.getElementById("removeMatch1")
	.addEventListener("click", deleteUserListiner(1));

document
	.getElementById("updateRating2")
	.addEventListener("click", updateRatingListiner(2));
document.getElementById("add2").addEventListener("click", addWorkoutListner(2));
document
	.getElementById("removeMatch2")
	.addEventListener("click", deleteUserListiner(2));

document
	.getElementById("updateRating3")
	.addEventListener("click", updateRatingListiner(3));
document.getElementById("add3").addEventListener("click", addWorkoutListner(3));
document
	.getElementById("removeMatch3")
	.addEventListener("click", deleteUserListiner(3));

document.getElementById("next").addEventListener("click", getNextPage);
document.getElementById("back").addEventListener("click", prevPage);
