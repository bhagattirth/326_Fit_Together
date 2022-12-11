import user from "./user.js";
const urlBase = "http://localhost:5000";
// Import elements from html
const editProfileButton = document.getElementById("editProfile");
const updateProfileButton = document.getElementById("updateProfile");
const selectProfilePictureButton = document.getElementById(
	"selectProfilePicture"
);
const imageURL = document.getElementById("imageURL");
const selectURLButton = document.getElementById("selectURL");
const deleteProfileButton = document.getElementById("deleteProfile");
const firstName = document.getElementById("inputFirstName");
const lastName = document.getElementById("inputLastName");
const phoneNumber = document.getElementById("inputPhoneNumber");
const workoutStyle = document.getElementById("inputWorkoutStyle");
const workoutsPerWeek = document.getElementById("inputWorkoutFrequency");
const workoutLength = document.getElementById("inputWorkoutLength");
const startTime = document.getElementById("startTime");
const endTime = document.getElementById("endTime");
const dayCheckboxes = {
	monday: document.getElementById("mondayCheckbox"),
	tuesday: document.getElementById("tuesdayCheckbox"),
	wednesday: document.getElementById("wednesdayCheckbox"),
	thursday: document.getElementById("thursdayCheckbox"),
	friday: document.getElementById("fridayCheckbox"),
	saturday: document.getElementById("saturdayCheckbox"),
	sunday: document.getElementById("sundayCheckbox"),
};
const selectedImageText = document.getElementById("profilePictureSelectedDiv");
const profilePicturePreview = document.getElementById("profilePicturePreview");

let profilePicture = null;

// The text boxes to be read from
const textBoxes = [
	firstName,
	lastName,
	phoneNumber,
	workoutStyle,
	workoutLength,
];

// Setting up button event listeners
selectURLButton.addEventListener("click", updateProfilePicture);
editProfileButton.addEventListener("click", editProfile);
updateProfileButton.addEventListener("click", async () => {
	await updateProfile(user.getUserId());
});
deleteProfileButton.addEventListener("click", async () => {
	await deleteProfile(user.getUserId());
});

// Sets the user profile picture in the top right
async function updateProfilePicture() {
	var image = new Image();
	image.onload = function () {
		if (this.width > 0) {
			profilePicturePreview.src = imageURL.value;
			profilePicturePreview.hidden = false;
			profilePicture = imageURL.value;
		}
	};
	image.onerror = function () {
		alert("Invalid Image URL");
	};
	image.src = imageURL.value;
}

// Validates user then gets information pertaining to the user and displays it
await validateUser();
await initialize(user.getUserId());

async function validateUser() {
	// validate accessToken
	const id = await user.checkToken();

	// if not valid, return
	if (!id) {
		location.href = "login.html";
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
				id = "profilePictureInDropdown"
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

// Fetches user information before populating fields
async function initialize(id) {
	try {
		const res = await fetch(`${urlBase}/profile/${id}/information`, {
			method: "GET",
			credentials: "include",
		});
		const msg = await res.json();
		if (!res.ok || res.status === 400) {
			throw new Error("Something went wrong please try again later");
		}

		populateProfile(msg);
	} catch (err) {
		alert("Profile information could not be found");
		return;
	}
}

// Enables editing of the profile by enabling user input
function editProfile() {
	editProfileButton.disabled = true;
	updateProfileButton.disabled = false;
	selectProfilePictureButton.disabled = false;
	startTime.disabled = false;
	endTime.disabled = false;
	textBoxes.forEach((cur) => (cur.readOnly = false));
	workoutsPerWeek.disabled = false;
	for (const box of Object.keys(dayCheckboxes)) {
		dayCheckboxes[box].disabled = false;
	}
	deleteProfileButton.disabled = false;
}

// Updates the user's profile with the set information
async function updateProfile(id) {
	// Form validation
	const validationErrors = validateUserInput();
	if (validationErrors.length > 0) {
		const errMsg = validationErrors.reduce(
			(prev, cur) => prev + "\n" + cur,
			""
		);
		alert("The following errors exist with the profile input:" + errMsg);
		return;
	}
	// Disable input for changes since editing is complete
	deleteProfileButton.disabled = true;
	editProfileButton.disabled = false;
	updateProfileButton.disabled = true;
	startTime.disabled = true;
	endTime.disabled = true;
	selectProfilePictureButton.disabled = true;
	textBoxes.forEach((cur) => (cur.readOnly = "readonly"));
	workoutsPerWeek.disabled = true;
	for (const box of Object.keys(dayCheckboxes)) {
		dayCheckboxes[box].disabled = true;
	}

	// Generate a JSON of the profile information
	const jsonObject = generateJSON();

	// Update the user information on the database with the generated JSON
	try {
		const res = await fetch(`${urlBase}/profile/${id}/information`, {
			method: "PUT",
			credentials: "include",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(jsonObject),
		});
		if (!res.ok || res.status === 400) {
			throw new Error("Something went wrong please try again later");
		}
		//populateProfile(jsonObject);
	} catch (err) {
		alert("Profile changes could not be saved");
		return;
	}

	// Clears selected image
	selectedImageText.innerHTML = "";
	profilePicturePreview.src = "";
	profilePicturePreview.hidden = true;

	// Updates the profile image on the server
	if (profilePicture !== null) {
		try {
			const res = await fetch(`${urlBase}/profile/${id}/picture`, {
				method: "PUT",
				credentials: "include",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({ imageURL: profilePicture }),
			});
			const msg = await res.json();
			if (!res.ok || res.status === 400) {
				throw new Error("Something went wrong please try again later");
			}
		} catch (err) {
			alert("Profile Image changes could not be saved");
			return;
		}
		// Update profile picture on the page
		document.getElementById("profilePictureInDropdown").src =
			profilePicture;
		profilePicture = null;
	}
}

// Fills in the on screen profile information from a profile object (object returned from backend)
function populateProfile(profileObject) {
	firstName.value = profileObject["firstName"];
	lastName.value = profileObject["lastName"];
	phoneNumber.value = profileObject["phoneNumber"];
	workoutStyle.value = profileObject["workoutStyle"];
	workoutsPerWeek.value = profileObject["workoutsPerWeek"];
	workoutLength.value = profileObject["averageWorkoutLength"];
	startTime.value = profileObject["startTime"];
	endTime.value = profileObject["endTime"];
	for (const day of profileObject["preferredDays"]) {
		dayCheckboxes[day].checked = true;
	}
}

// Generates a profile object from the on screen profile information
function generateJSON() {
	const json = {};
	json["firstName"] = firstName.value;
	json["lastName"] = lastName.value;
	json["phoneNumber"] = phoneNumber.value;
	json["workoutStyle"] = workoutStyle.value;
	json["workoutsPerWeek"] = workoutsPerWeek.value;
	json["averageWorkoutLength"] = workoutLength.value;
	json["startTime"] = startTime.value;
	json["endTime"] = endTime.value;
	json["preferredDays"] = [];
	for (const dayKey of Object.keys(dayCheckboxes)) {
		if (dayCheckboxes[dayKey].checked === true) {
			json["preferredDays"].push(dayKey);
		}
	}
	return json;
}

// Deletes the user profile
async function deleteProfile(id) {
	const deleteProfile = confirm(
		"Are you sure to delete your profile? This action cannot be reverted."
	);
	if (!deleteProfile) {
		return;
	}
	try {
		const res = await fetch(`${urlBase}/profile/${id}`, {
			method: "DELETE",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!res.ok || res.status === 400) {
			throw new Error("Something went wrong please try again later");
		}
		user.logout();
		location.href = "index.html";
	} catch (err) {
		alert("Issue deleting profile. Please try again later.");
		return;
	}
}

// Validates that profile information fields are filled correctly
function validateUserInput() {
	// Pushes all errors to be displayed as they are encountered
	const errors = [];
	if (!firstName.value.match(/^\S.{0,30}$/))
		errors.push(
			"Invalid First Name (cannot begin with whitespace, must be between 1-31 characters)"
		);
	if (!lastName.value.match(/^\S.{0,30}$/))
		errors.push(
			"Invalid Last Name (cannot begin with whitespace, must be between 1-31 characters)"
		);
	if (
		!(
			phoneNumber.value.match(/^\d\d\d-\d\d\d-\d\d\d\d$/) ||
			phoneNumber.value.match(/^\d\d\d\d\d\d\d\d\d\d$/)
		)
	)
		errors.push(
			"Invalid Phone Number (must be in XXX-XXX-XXXX or XXXXXXXXXX format)"
		);
	if (!workoutStyle.value.match(/^\S.{0,40}$/))
		errors.push(
			"Invalid Workout Style (cannot begin with whitespace, must be between 1-41 characters)"
		);
	if (!workoutLength.value.match(/^\d{0,2}(\.\d{0,2})?$/))
		errors.push("Invalid Average Workout Length (must be in HH, or HH.hh)");
	const startTimeArr = startTime.value.split(":");
	const endTimeArr = endTime.value.split(":");
	if (startTimeArr[0] === endTimeArr[0] && startTimeArr[1] === endTimeArr[1])
		errors.push(
			"Invalid Start/End Time (Start and End Time cannot be the same)"
		);
	let count = 0;
	for (const dayKey of Object.keys(dayCheckboxes)) {
		if (dayCheckboxes[dayKey].checked === true) {
			count += 1;
		}
	}
	if (count === 0) errors.push("Must Select at least on Preferred Day");
	return errors;
}
