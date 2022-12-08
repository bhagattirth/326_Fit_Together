import user from "./user.js";
const urlBase = "http://localhost:5000";
const carouselDiv = document.getElementById("carouselDiv");
const logoutButton = document.getElementById("logoutOption");
const nextButton = document.getElementById("nextButton");
const maxPotentialMatchesAtOnce = 10;
let curPotentialMatches = 0;
const profilePictureImage = document.getElementById("profilePicture");

await validateUser();
await initialize(user.getUserId());

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

// Initializes the find a fit page by pulling the potential matches of the user
async function initialize(id) {
	try {
		const res = await fetch(`${urlBase}/matches/${id}/potential`, {
			method: "GET",
			credentials: "include",
		});
		const msg = await res.json();
		if (!res.ok) {
			throw new Error("Something went wrong please try again later");
		}
		user.setPotentialMatches(msg);
	} catch (err) {
		alert("Potential Match Information could not be found");
		return;
	}
	const potentialMatches = user.getPotentialMatches(
		maxPotentialMatchesAtOnce
	);
	const potentialMatchesKeys = Object.keys(potentialMatches);
	curPotentialMatches = potentialMatchesKeys.length;

	// Checks if there are potential matches to scroll through
	if (curPotentialMatches === 0) {
		alertNoMoreMatches();
	} else {
		// Generates the potential match carousel items if they exist
		let firstIteration = true;
		carouselDiv.innerHTML = "";
		for (const potentialMatchID of potentialMatchesKeys) {
			const otherID = potentialMatchID;
			const profile = potentialMatches[potentialMatchID].profile;
			const profileImage =
				potentialMatches[potentialMatchID].profileImage;
			generateCarouselItem(
				otherID,
				profile,
				profileImage,
				firstIteration
			);
			firstIteration = false;
		}
	}
}

// Accepts a match when the accept button is pressed
async function acceptMatch(otherID) {
	try {
		const res = await fetch(
			`${urlBase}/matches/${user.getUserId()}/potential/${otherID}`,
			{
				method: "PUT",
				credentials: "include",
			}
		);
		if (!res.ok) {
			throw new Error("Something went wrong please try again later");
		}
	} catch (err) {
		alert("Unable to Accept Match");
		return;
	}
	// Removes the match from the list of options and adds another potential match if more exist that aren't shown
	removeFromCarousel(otherID);
	addPotentialToCarousel();
}

// Adds a potential match that was previously not shown to the list of potential matches that are shown
function addPotentialToCarousel() {
	const potentialMatch = user.getPotentialMatches(1);
	const keys = Object.keys(potentialMatch);
	if (keys.length === 1) {
		curPotentialMatches++;
		generateCarouselItem(
			keys[0],
			potentialMatch[keys].profile,
			potentialMatch[keys].profileImage
		);
	}
}

// Removes a currently shown potential match from the list of potential matches that are shown
function removeFromCarousel(id) {
	curPotentialMatches--;
	if (curPotentialMatches === 0) {
		alertNoMoreMatches();
	}
	nextButton.click();
	document.getElementById("carouselItem" + id).remove();
}

// Alerts the user that there are no more potential matches currently
function alertNoMoreMatches() {
	carouselDiv.innerHTML = `<div id="noMoreMatches"><h1>No More Matches :(<h1>
			</br>
			<h2>Try again later!<h2></div>`;
	carouselDiv.style.height = "80vh";
}

// Denies the current match
async function denyMatch(otherID) {
	try {
		const res = await fetch(
			`${urlBase}/matches/${user.getUserId()}/potential/${otherID}`,
			{
				method: "delete",
				credentials: "include",
			}
		);
		if (!res.ok) {
			throw new Error("Something went wrong please try again later");
		}
	} catch (err) {
		alert("Unable to Deny Match");
		return;
	}

	// Removes the match from the list of options and adds another potential match if more exist that aren't shown
	removeFromCarousel(otherID);
	addPotentialToCarousel();
}

// Generates a carousel item to shown a potential match that can be accepted or denied
function generateCarouselItem(id, profile, profileImage, active = false) {
	const upperCaseDays = [];
	for (const day of profile["preferredDays"]) {
		upperCaseDays.push(day.charAt(0).toUpperCase() + day.slice(1));
	}
	// The HTML for the potential match
	const carouselItemInnterHTML = `<img
							class="caro-img"
							src=${profileImage}
							alt="Profile Picture"
						/>
						<p class="name">${profile["firstName"]} ${profile["lastName"]}</p>
						<div>
							<p class="workout-split">Workout Split: ${profile["workoutStyle"]}</p>
						</div>
						<div>
							<button class="show-info" type="button" id=${"moreInfoButton" + id}>
								More info
							</button>
						</div>
                        <div class="moreInfo" id = ${
							"moreInfoDiv" + id
						} hidden = "true">
                            <p class="info-sec">Workouts Per Week:      ${
								profile["workoutsPerWeek"]
							}</p>
							<p class="info-sec">
                            Average Workout Length: ${
								profile["averageWorkoutLength"]
							}</p>
							<p class="info-sec">
                            Start Time:      ${profile["startTime"]}</p>
							<p class="info-sec">
                            End Time:         ${profile["endTime"]}</p>
							<p class="info-sec">
                            Preferred Days:         ${upperCaseDays.join(
								", "
							)}</p>
                        </div>
						<div class="selection">
					<button class="select-btn" id=${"acceptMatchButton" + id}>
						<i class="fa-solid fa-check yes"></i>
					</button>
					<button class="select-btn" id=${"denyMatchButton" + id}>
						<i class="fa-solid fa-x no"></i>
					</button>
				</div>`;
	const carouselItemWrapper = document.createElement("div");
	carouselItemWrapper.setAttribute("id", `${"carouselItem" + id}`);
	carouselItemWrapper.classList.add("carousel-item");
	if (active) {
		carouselItemWrapper.classList.add("active");
	}
	carouselItemWrapper.innerHTML = carouselItemInnterHTML;
	carouselDiv.appendChild(carouselItemWrapper);
	const curMoreInfoButton = document.getElementById("moreInfoButton" + id);
	curMoreInfoButton.addEventListener("click", () => {
		const curMoreInfoDiv = document.getElementById("moreInfoDiv" + id);
		if (curMoreInfoDiv.hidden) {
			curMoreInfoDiv.hidden = false;
			curMoreInfoButton.innerHTML = "Less Info";
		} else {
			curMoreInfoDiv.hidden = true;
			curMoreInfoButton.innerHTML = "More Info";
		}
	});
	const curAcceptMatchButton = document.getElementById(
		"acceptMatchButton" + id
	);
	curAcceptMatchButton.addEventListener("click", () => {
		acceptMatch(id);
	});
	const curDenyMatchButton = document.getElementById("denyMatchButton" + id);
	curDenyMatchButton.addEventListener("click", () => {
		denyMatch(id);
	});
}
