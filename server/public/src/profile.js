import user from "./user.js";
const urlBase = "http://localhost:5000";
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
const profilePictureImage = document.getElementById("profilePicture");
const matchesOption = document.getElementById("matchesOption");
const logoutOption = document.getElementById("logoutOption");

let profilePicture = null;

const textBoxes = [
	firstName,
	lastName,
	phoneNumber,
	workoutStyle,
	workoutLength,
];

selectURLButton.addEventListener("click", updateProfilePicture);
editProfileButton.addEventListener("click", editProfile);
updateProfileButton.addEventListener("click", async () => {
	await updateProfile(user.getUserId());
});
deleteProfileButton.addEventListener("click", async () => {
	await deleteProfile(user.getUserId());
});
matchesOption.addEventListener("click", () => {
	location.href = "matchHistory.html";
});
logoutOption.addEventListener("click", () => {
	user.logout();
	window.location.replace("index.html");
});

async function updateProfilePicture() {
	var image = new Image();
	image.onload = function () {
		if (this.width > 0) {
			console.log("image exists");
		}
		profilePicturePreview.src = imageURL.value;
		profilePicturePreview.hidden = false;
		profilePicture = imageURL.value;
	};
	image.onerror = function () {
		alert("Invalid Image URL");
	};
	image.src = imageURL.value;
}

await validateUser();
await initialize(user.getUserId());

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

async function initialize(id) {
	console.log(id);
	try {
		const res = await fetch(
			`http://localhost:5000/profile/${id}/information`,
			{
				method: "GET",
				credentials: "include",
			}
		);
		const msg = await res.json();
		if (!res.ok || res.status === 400) {
			throw new Error("Something went wrong please try again later");
		}

		populateProfile(msg);
	} catch (err) {
		alert("Profile information could not be found");
		return;
	}

	await setProfilePicture(id);
}

async function setProfilePicture(id) {
	try {
		const res = await fetch(`http://localhost:5000/profile/${id}/picture`, {
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

async function updateProfile(id) {
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
	const jsonObject = generateJSON();
	try {
		const res = await fetch(
			`http://localhost:5000/profile/${id}/information`,
			{
				method: "PUT",
				credentials: "include",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify(jsonObject),
			}
		);
		if (!res.ok || res.status === 400) {
			throw new Error("Something went wrong please try again later");
		}

		populateProfile(jsonObject);
	} catch (err) {
		alert("Profile changes could not be saved");
		return;
	}
	selectedImageText.innerHTML = "";
	profilePicturePreview.src = "";
	profilePicturePreview.hidden = true;
	if (profilePicture !== null) {
		try {
			const res = await fetch(
				`http://localhost:5000/profile/${id}/picture`,
				{
					method: "PUT",
					credentials: "include",
					headers: { "Content-type": "application/json" },
					body: JSON.stringify({ imageURL: profilePicture }),
				}
			);
			const msg = await res.json();
			if (!res.ok || res.status === 400) {
				throw new Error("Something went wrong please try again later");
			}
		} catch (err) {
			console.log(err);
			alert("Profile Image changes could not be saved");
			return;
		}
		setProfilePicture(user.getUserId());
		profilePicture = null;
	}
}

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

function generateJSON() {
	const json = {};
	json["firstName"] = firstName.value;
	json["lastName"] = lastName.value;
	json["phoneNumber"] = phoneNumber.value;
	json["workoutStyle"] = workoutStyle.value;
	json["workoutsPerWeek"] = workoutsPerWeek.value;
	json["averageWorkoutLength"] = workoutLength.value;
	json["startTime"] = startTime.value;
	json["endTime"] = startTime.value;
	json["preferredDays"] = [];
	for (const dayKey of Object.keys(dayCheckboxes)) {
		if (dayCheckboxes[dayKey].checked === true) {
			json["preferredDays"].push(dayKey);
		}
	}
	return json;
}

async function deleteProfile(id) {
	const deleteProfile = confirm(
		"Are you sure to delete your profile? This action cannot be reverted."
	);
	if (!deleteProfile) {
		return;
	}
	try {
		const res = await fetch(`http://localhost:5000/profile/${id}`, {
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
		window.location.replace("http://localhost:5000/public/index.html");
	} catch (err) {
		alert("Issue deleting profile. Please try again later.");
		return;
	}
}
