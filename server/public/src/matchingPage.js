const carouselDiv = document.getElementById("carouselDiv");
const logoutButton = document.getElementById("logoutOption");
logoutButton.addEventListener("click", logout);

// Placehold values
const id = 12;
initialize(12);
// Replace from shared once set up
async function logout() {
	const res = await fetch("http://localhost:5000/auth/logout", {
		method: "POST",
		credentials: "include",
		headers: { "Content-type": "application/json" },
		body: null,
	});

	const msg = await res.json();

	if (res.ok) {
		location.href = "index.html";
	} else {
		alert("failed to logout");
	}
}

async function initialize(id) {
	try {
		const res = await fetch(
			`http://localhost:5000/matches/${id}/potential`,
			{
				method: "GET",
				credentials: "include",
			}
		);
		const msg = await res.json();
		if (!res.ok) {
			throw new Error("Something went wrong please try again later");
		}
		let firstIteration = true;
		for (const potentialMatchID of Object.keys(msg)) {
			const otherID = potentialMatchID;
			const profile = msg[potentialMatchID].profile;
			const profileImage = msg[potentialMatchID].profileImage;
			generateCarouselItem(
				otherID,
				profile,
				profileImage,
				firstIteration
			);
			firstIteration = false;
		}
	} catch (err) {
		alert("Potential Match Information could not be found");
		return;
	}
}
async function acceptMatch(otherID) {
	try {
		const res = await fetch(
			`http://localhost:5000/matches/${id}/potential/${otherID}`,
			{
				method: "PUT",
				credentials: "include",
			}
		);
		const msg = await res.json();
		// removeFromCarousel(otherID);

		if (!res.ok) {
			throw new Error("Something went wrong please try again later");
		}
	} catch (err) {
		alert("Unable to Accept Match");
		return;
	}
}

function removeFromCarousel(id) {
	// Change selected (store map of otherIDs when reading in, remove from map, select random from map and set that as active)
	// If empty, hide carousel and display text stating no potential matches remain. Come back later.
	// document.getElementById("carouselItem" + otherID).remove();
}
async function denyMatch(otherID) {
	console.log("deny" + otherID);
}

function generateCarouselItem(id, profile, profileImage, active = false) {
	const upperCaseDays = [];
	for (const day of profile["preferredDays"]) {
		upperCaseDays.push(day.charAt(0).toUpperCase() + day.slice(1));
	}
	const carouselItemInnterHTML = `<img
							class="caro-img"
							src=${profileImage}
							alt="Profile Picture"
						/>
						<p class="name">${profile["firstName"]} ${profile["lastName"]}</p>
						<div>
							<p>Workout Split: ${profile["workoutStyle"]}</p>
						</div>
						<div>
							<button class="btn btn-secondary" type="button" id=${"moreInfoButton" + id}>
								More info
							</button>
						</div>
                        <div id = ${"moreInfoDiv" + id} hidden = "true">
                            Workouts Per Week:      ${
								profile["workoutsPerWeek"]
							}
							</br>
                            Average Workout Length: ${
								profile["averageWorkoutLength"]
							}
							</br>
                            Workouts Per Week:      ${
								profile["workoutsPerWeek"]
							}
							</br>
                            Preferred Time:         ${profile["preferredTime"]}
							</br>
                            Preferred Days:         ${upperCaseDays.join(", ")}
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
