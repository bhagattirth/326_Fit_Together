let userMap = { user1: null, user2: null, user3: null };
let firstEntryOnPage = 0;
let lastEntryOnPage = 2;
let jsonSize = 0;

const startup = async () => {
	const res = await fetch(
		`https://ufit12.herokuapp.com/matchHistory/getPast`
	);
	const json = await res.json();

	jsonSize = json.length;
	checkLocalStorage();
	let count = 1;
	let i = firstEntryOnPage;
	while (i <= lastEntryOnPage && i < json.length) {
		userMap["user" + count] = json[i].name;
		addProfileInfo(json[i], count);
		createCarousel(json[i].pastWorkout, count);
		showRating(json[i], count);
		i++;
		count++;
	}
	activateListeners();
};

function checkLocalStorage() {
	const storage = window.localStorage;
	const first = storage.getItem("firstEntryOnPage");
	const last = storage.getItem("lastEntryOnPage");

	firstEntryOnPage = first === null ? 0 : JSON.parse(first);
	lastEntryOnPage = last === null ? 2 : JSON.parse(last);
}

function addProfileInfo(userData, i) {
	let profileInfo = document.getElementById("profile" + i);
	let profilePic = document.getElementById("profilePic" + i);
	let prefDate = document.getElementById("prefDate" + i);
	let name = document.createElement("SPAN");

	name.classList.add("prev-matches-name");
	name.innerHTML = userData.name;
	profileInfo.appendChild(name);
	profileInfo.innerHTML += "</br>";
	profileInfo.innerHTML += "Last Workout On: " + userData.lastWorkout;
	profileInfo.innerHTML += "</br>";
	profileInfo.innerHTML += "Contact: " + userData.contact;
	profilePic.src = userData.imgURL;

	for (let days of userData.preference) {
		prefDate.innerText += days + " ";
	}
}

function createCarousel(workouts, i) {
	let carousel = document.getElementById("carousel" + i);
	let carouselBody = document.createElement("div");
	carouselBody.classList.add("carousel-inner", "border-2");

	let isFirst = true;
	workouts.forEach(function (e) {
		createWorkoutCard(e, carouselBody, isFirst);
		isFirst = false;
	});

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
	const storage = window.localStorage;
	if (lastEntryOnPage + 1 < jsonSize) {
		storage.setItem("firstEntryOnPage", (firstEntryOnPage + 3).toString());
		storage.setItem("lastEntryOnPage", (lastEntryOnPage + 3).toString());
		location.reload();
	}
}

function prevPage() {
	const storage = window.localStorage;
	if (0 < lastEntryOnPage - 3) {
		storage.setItem("firstEntryOnPage", (firstEntryOnPage - 3).toString());
		storage.setItem("lastEntryOnPage", (lastEntryOnPage - 3).toString());
		location.reload();
	}
}

function createWorkoutCard(exercises, cBody, isFirst) {
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
	cardTitle.innerHTML = exercises[0];
	cardBody.appendChild(cardTitle);

	let boldText = document.createElement("strong");
	boldText.innerHTML = exercises[1] + ":";
	cardBody.appendChild(boldText);

	let exerciseText = document.createElement("p");
	exerciseText.classList.add("card-text");

	for (let i = 2; i < exercises.length; i++) {
		exerciseText.innerHTML += exercises[i] + "</br>";
	}

	cardBody.appendChild(exerciseText);
	card.appendChild(cardBody);
	carouselItem.appendChild(card);
	cBody.appendChild(carouselItem);
}

function showRating(userData, i) {
	let dropDown = document.getElementById("selectRating" + i);
	["1/5", "2/5", "3/5", "4/5", "5/5"].forEach(function (e) {
		let option = document.createElement("option");
		option.setAttribute("value", e.substring(0, 1));
		option.innerText = e;

		if (e.substring(0, 1) === userData.ratings) {
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
		const res = await fetch(
			`https://ufit12.herokuapp.com/matchHistory/addWorkout`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},

				body: JSON.stringify({
					user: userMap["user" + i],
					workout: workouts,
					dates: date,
					type: wType,
				}),
			}
		);
		const msg = await res.json();
		location.reload();
	}
};

const updateRatingListiner = (i) => async () => {
	let newRating = document.getElementById("selectRating" + i).value;
	const res = await fetch(
		`https://ufit12.herokuapp.com/matchHistory/ratingUpdate`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user: userMap["user" + i],
				rating: newRating,
			}),
		}
	);
	const msg = await res.json();
	location.reload();
};

const deleteUserListiner = (i) => async () => {
	let user = "user" + document.getElementById("removeMatch" + i).value;
	const res = await fetch(
		`https://ufit12.herokuapp.com/matchHistory/deleteEntry`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ user: userMap[user] }),
		}
	);
	const msg = await res.json();
	location.reload();
};

function activateListeners() {
	if (userMap["user1"] !== null) {
		document.getElementById("previousMatchesOne").style.display = "";
		document
			.getElementById("updateRating1")
			.addEventListener("click", updateRatingListiner(1));
		document
			.getElementById("add1")
			.addEventListener("click", addWorkoutListner(1));
		document
			.getElementById("removeMatch1")
			.addEventListener("click", deleteUserListiner(1));
	} else {
		document.getElementById("previousMatchesOne").style.display = "none";
	}

	if (userMap["user2"] !== null) {
		document.getElementById("previousMatchesTwo").style.display = "";
		document
			.getElementById("updateRating2")
			.addEventListener("click", updateRatingListiner(2));
		document
			.getElementById("add2")
			.addEventListener("click", addWorkoutListner(2));
		document
			.getElementById("removeMatch2")
			.addEventListener("click", deleteUserListiner(2));
	} else {
		document.getElementById("previousMatchesTwo").style.display = "none";
	}

	if (userMap["user3"] !== null) {
		document.getElementById("previousMatchesThree").style.display = "";
		document
			.getElementById("updateRating3")
			.addEventListener("click", updateRatingListiner(3));
		document
			.getElementById("add3")
			.addEventListener("click", addWorkoutListner(3));
		document
			.getElementById("removeMatch3")
			.addEventListener("click", deleteUserListiner(3));
	} else {
		document.getElementById("previousMatchesThree").style.display = "none";
	}
}

window.onload = startup();

document.getElementById("next").addEventListener("click", getNextPage);
document.getElementById("back").addEventListener("click", prevPage);
