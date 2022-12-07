import user from "./user.js";
const urlBase = "http://localhost:5000";

//Temporary used for testing
document.getElementById("noWorkoutText1").style.display = "none";
document.getElementById("noWorkoutText2").style.display = "none";
document.getElementById("previousMatchesOne").style.display = "none";
document.getElementById("previousMatchesTwo").style.display = "none";
document.getElementById("previousMatchesThree").style.display = "none";
document.getElementById("back").style.display = "none";
document.getElementById("next").style.display = "none";

//Keeps track of the members ids that are being displayed for the user
let userMap = { user1: null, user2: null, user3: null };

//Indexes to keep track of prev and next page
let firstEntryOnPage = 0;
let lastEntryOnPage = 2;

//Used for prev and next page to determine if there is a next page
let jsonSize = 0;

async function validateUser() {
	// validate accessToken
	const id = await user.checkToken();

	// if not valid, return
	if (!id) {
		location.href = "homepage.html";
		return;
	}
	// update user id here
	user.setUserId(id);

	// get image link
	const imageLink = await user.getProfilePicture();

	// create dropdown
	const html = `<div id='profile-dropdown' class="dropdown">
			<img
				class="user-icon dropdown-toggle"
				data-bs-toggle="dropdown"
				src="${imageLink}"
				alt="user icon"
			/>
			<ul class="dropdown-menu">
				<li>
					<a id="profile" class="dropdown-item" href="profile.html">
						Profile
					</a>
				</li>
				<li>
					<a id="findFit" class="dropdown-item" href="matchingPage.html">
						Find a Fit!
					</a>
				</li>
				<li>
					<a id="Matches" class="dropdown-item" href="matchHistory.html">
						Matches
					</a>
				</li>
				<li>
					<a id="logout" class="dropdown-item" href="#">
						Log out
					</a>
				</li>
			</ul>
		</div>`;
	const wrapper = document.createElement("div");
	wrapper.classList.add("dropdown");
	wrapper.innerHTML = html;

	// insert element into page
	const dropdown = document.getElementById("logo");
	dropdown.insertAdjacentElement("afterend", wrapper);

	// logout button functionality
	const logoutBtn = document.getElementById("logout");
	logoutBtn.addEventListener("click", user.logout);
}

//The main function - Loads Past Member Entries into the page
const loadUsers = async (id) => {

	//The array of past workouts of the user that is fetch from the database
	let json = null;

	//Attempts to fetch the pastworkout array
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

	//resets the map
	userMap = { user1: null, user2: null, user3: null };
	jsonSize = json.length;

	//Will go from 1 upto 3 - used to add things into usermap
	let count = 1;

	//Grabs firstEntryOnPageth member in the array upto lastEntryOnPageth member (at most 3)
	let i = firstEntryOnPage;
	while (i <= lastEntryOnPage && i < json.length) {
		//Grabs essential member data used for displaying
		const userInfo = await getMembersInfo(json[i].id);

		//adds member id to the userMap to make it easier to do api calls
		userMap["user" + count] = json[i].id;

		//Uses Essential member data to display it on one of the entries
		addProfileInfo(userInfo, count);

		//Creates carousel for a spefic entry
		createCarousel(json[i], count);

		//Displays current user's rating for the member
		showRating(json[i], count);

		i++;
		count++;
	}

	//Hide or reveal entry slots depending on how many users are going to be displayed
	displayUser();
	showPrevAndNextButton();
};


/*
	Takes member's id and returns a dictionary of member info needed for displaying
	member info:{
		imgURL: Image URL
		name: Member's first and last name,
		preference: Member's prefered workout days,
		email: member's email,
		phone: member's phone number
	}
*/
async function getMembersInfo(id) {
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

//Uses member info to display it on the ith entry slot
function addProfileInfo(userData, i) {

	//Gets the elements for a entry slot that needs to be updated
	let profileInfo = document.getElementById("profile" + i);
	let profilePic = document.getElementById("profilePic" + i);
	let prefDate = document.getElementById("prefDate" + i);
	let name = document.createElement("SPAN");

	//Displays the members full name on the entry slot
	name.classList.add("prev-matches-name");
	name.innerHTML = userData.name;

	//Displays user email and profile img on the entry slot
	profileInfo.innerHTML = "";
	profileInfo.appendChild(name);
	profileInfo.innerHTML += "</br>";
	profileInfo.innerHTML += "</br>";
	profileInfo.innerHTML += "Email: " + userData.email;
	
	//Displays phone number if member has entered one
	if(userData.phone !== "000-000-0000"){
		profileInfo.innerHTML += "</br>";
		profileInfo.innerHTML += "Phone: " + userData.phone;
	}
	profilePic.src = userData.imgURL;

	//Resets all Date Text if it exist
	prefDate.innerText = "";

	//If Member has prefered day set then it adds it to the pref date modal
	if (userData.preference.length > 0) {
		for (let i = 0; i < userData.preference.length; i++) {
			if (userData.preference.length - 1 === i) {
				prefDate.innerText += userData.preference[i];
			} else {
				prefDate.innerText += userData.preference[i] + ", ";
			}
		}
	} else {
		prefDate.innerText = "The Member Hasn't Set Preferred Days";
	}
}

//Takes in a workout information and creates a carousel on the ith entry
function createCarousel(pastWorkouts, i) {

	/*
		Appending Structure:
		carousel <- carouselBody <- cards created from createWorkoutCard,
		leftButton, rightButton

		leftButton <- spanIcon, spanIcon2
		rightButton <- spanIconR, spanIconR2
	*/

	//The information needed to display workouts on carousel (all arrays)
	const workouts = pastWorkouts.workout;
	const workoutTitles = pastWorkouts.workoutTitle;
	const workoutDates = pastWorkouts.date;

	let carousel = document.getElementById("carousel" + i);
	carousel.innerHTML = "";
	let carouselBody = document.createElement("div");
	carouselBody.classList.add("carousel-inner", "border-2");

	let isFirst = true;

	
	//	If there is no workout listed for the member yet,
	//	create a card reminding the user to fill in data.
	if(workouts.length === 0){
		createWorkoutCard(
			[[""]],
			[["Click to Add Workout to Add Info"]],
			[["Add Workout Data"]],
			carouselBody,
			isFirst
		)
	}else{
		//Otherwise, show the display all the workouts in the carousel
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
	}
	//Buttons for moving back and worth in the carousel
	let leftButton = document.createElement("button");
	leftButton.classList.add("carousel-control-prev", "carousel-arrow-color");
	setAttributes(leftButton, {
		type: "button",
		id: "carouselLeftButton" + i,
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
		id: "carouselRightButton" + i,
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

//Helper function that creates workout cards and adds it to carousel
function createWorkoutCard(exercises, title, date, cBody, isFirst) {

	/* Appending Structure for the card:
	   cBody (the carousel body) <- cardItem (workout card)
	   cardItem <- card <- cardBody <- card-Title, boldText, exerciseText
	*/

	let carouselItem = document.createElement("div");

	//If it is the first card, we set it active on the carousel
	isFirst
		? carouselItem.classList.add("carousel-item", "active")
		: carouselItem.classList.add("carousel-item");

	let card = document.createElement("div");
	card.classList.add("card");

	let cardBody = document.createElement("div");
	card.classList.add("card-body");

	//Adds date of the workout into the tile of the card
	let cardTitle = document.createElement("h3");
	cardTitle.classList.add("card-title");
	cardTitle.innerHTML = date;
	cardBody.appendChild(cardTitle);

	//adds workout Type to boldText
	let boldText = document.createElement("strong");
	boldText.innerHTML = title + ":";
	cardBody.appendChild(boldText);

	let exerciseText = document.createElement("p");
	exerciseText.classList.add("card-text");

	//Adds workouts to the card
	for (let i = 0; i < exercises.length; i++) {
		exerciseText.innerHTML += exercises[i] + "</br>";
	}

	cardBody.appendChild(exerciseText);
	card.appendChild(cardBody);
	carouselItem.appendChild(card);
	cBody.appendChild(carouselItem);
}

//Displays user's rating for that member and creates the rating dropdown
function showRating(userData, i) {
	let dropDown = document.getElementById("selectRating" + i);
	dropDown.innerHTML = "";

	//Creates the rating dropdown 
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

//Helper Function Used to add multiple attributes at once
function setAttributes(el, attrs) {
	for (var key in attrs) {
		el.setAttribute(key, attrs[key]);
	}
}

//Button Event To add a valid workout to a entry
const addWorkoutListner = (i) => async () => {

	//Reads the workout data entered into the fields
	let workouts = document.getElementById("workout" + i).value;
	let date = document.getElementById("date" + i).value;
	let wType = document.getElementById("wType" + i).value;

	//Adds workout data to pastworkout if it is valid
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
			credentials: "include",
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

		//Reloads page page with the new workout if it was successful added
		if (!res.ok) {
			alert("Failed to Add Workout");
		} else {
			loadUsers(user.getUserId());
		}
	}
};

//Button Event To Update a members rating
const updateRatingListiner = (i) => async () => {
	let newRating = document.getElementById("selectRating" + i).value;
	const res = await fetch(`${urlBase}/matchHistory/ratingUpdate`, {
		method: "POST",
		credentials: "include",
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

//Button Event Used to Delete User From User workout record
const deleteUserListiner = (i) => async () => {
	let userI = "user" + i;

	const res = await fetch(`${urlBase}/matchHistory/deleteEntry`, {
		method: "DELETE",
		credentials: "include",
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

//Displays entry slots if there is member data on that slot
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

	if (userMap["user1"] === null && userMap["user2"] === null  && userMap["user3"] === null){
		document.getElementById("noWorkoutText1").style.display = "";
		document.getElementById("noWorkoutText2").style.display = "";
	}else{
		document.getElementById("noWorkoutText1").style.display = "none";
		document.getElementById("noWorkoutText2").style.display = "none";
	}
}

//Next button event that allows user to move to the next page
function getNextPage() {
	if (lastEntryOnPage + 1 < jsonSize) {
		firstEntryOnPage = firstEntryOnPage + 3;
		lastEntryOnPage = lastEntryOnPage + 3;

		//Reloads entries with next members data
		loadUsers(user.getUserId());
	}
}

//Previous button event that allows user to go to the last page
function prevPage() {

	//Checks if it can move move pages
	if (0 < lastEntryOnPage - 3) {
		firstEntryOnPage = firstEntryOnPage - 3;
		lastEntryOnPage = lastEntryOnPage - 3;

		//Reloads entries with previous members data
		loadUsers(user.getUserId());
	}
}

//Disply Next and Prev button if only there entries in the next page
function showPrevAndNextButton(){
	//displays the Prev button if previous entries exist
	if(lastEntryOnPage + 1 < jsonSize){
		document.getElementById("next").style.display = "";
	}else{
		document.getElementById("next").style.display = "none";
	}
	//displays the next button if next entries exist
	if(0 < lastEntryOnPage - 3){
		document.getElementById("back").style.display = "";
	}else{
		document.getElementById("back").style.display = "none";
	}
}

await validateUser();

//Loads users past workout entries
loadUsers(user.getUserId());


//Allows user to update rating when pressing the update button for the first entry
document
	.getElementById("updateRating1")
	.addEventListener("click", updateRatingListiner(1));

//Allows user to add workout when adding a valid workout for entry 1 when clicking the button
document.getElementById("add1").addEventListener("click", addWorkoutListner(1));

//Removes entry 1 when clicking this button
document
	.getElementById("removeMatch1")
	.addEventListener("click", deleteUserListiner(1));


//Allows user to update rating when pressing the update button for the second entry
document
	.getElementById("updateRating2")
	.addEventListener("click", updateRatingListiner(2));

//Allows user to add workout when adding a valid workout for entry 2 when clicking the button
document.getElementById("add2").addEventListener("click", addWorkoutListner(2));

//Removes entry 2 when clicking the remove button
document
	.getElementById("removeMatch2")
	.addEventListener("click", deleteUserListiner(2));


//Allows user to update rating when pressing the update button for the third entry
document
	.getElementById("updateRating3")
	.addEventListener("click", updateRatingListiner(3));

//Allows user to add workout when adding a valid workout for entry 2 when clicking the button
document.getElementById("add3").addEventListener("click", addWorkoutListner(3));

//Removes entry 3 when clicking the remove button
document
	.getElementById("removeMatch3")
	.addEventListener("click", deleteUserListiner(3));


//Enables buttons the prev and next buttons to go back and forth on pages
document.getElementById("next").addEventListener("click", getNextPage);
document.getElementById("back").addEventListener("click", prevPage);
