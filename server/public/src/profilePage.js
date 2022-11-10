import user from "./user.js";

const editProfileButton = document.getElementById("editProfile");
const updateProfileButton = document.getElementById("updateProfile");
const selectProfilePictureButton = document.getElementById(
	"selectProfilePicture"
);
const deleteProfileButton = document.getElementById("deleteProfile");
const hiddenFilepicker = document.getElementById("hiddenFilepicker");
const firstName = document.getElementById("inputFirstName");
const lastName = document.getElementById("inputLastName");
const phoneNumber = document.getElementById("inputPhoneNumber");
const workoutStyle = document.getElementById("inputWorkoutStyle");
const workoutsPerWeek = document.getElementById("inputWorkoutFrequency");
const workoutLength = document.getElementById("inputWorkoutLength");
const preferredTime = document.getElementById("inputTimePreference");
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
const profilePicturePreviewLabel = document.getElementById(
	"profilePicturePreviewLabel"
);
const matchesOption = document.getElementById("matchesOption");
const logoutOption = document.getElementById("logoutOption");

let profilePicture = null;

const textBoxes = [
	firstName,
	lastName,
	phoneNumber,
	workoutStyle,
	workoutLength,
	preferredTime,
];

hiddenFilepicker.onchange = updateProfilePicture;
editProfileButton.addEventListener("click", editProfile);
updateProfileButton.addEventListener("click", updateProfile);
selectProfilePictureButton.addEventListener("click", callFilePicker);
deleteProfileButton.addEventListener("click", deleteProfile);
matchesOption.addEventListener("click", () => {
	location.href = "matchHistory.html";
});
logoutOption.addEventListener("click", () => {
	user.logout();
	window.location.replace("index.html");
});

function callFilePicker() {
	hiddenFilepicker.click();
}

async function updateProfilePicture() {
	if (hiddenFilepicker.files[0]) {
		profilePicture = await readImage();
		selectedImageText.innerHTML = `Selected Image: ${hiddenFilepicker.files[0].name}`;
		profilePicturePreview.src = profilePicture;
		profilePicturePreview.hidden = false;
	}
}

function readImage() {
	return new Promise((resolve, reject) => {
		let reader = new FileReader();
		reader.onload = () => {
			resolve(reader.result);
		};
		reader.onerror = reject;
		reader.readAsDataURL(hiddenFilepicker.files[0]);
	});
}

initialize(user.getUserId());

async function initialize(id) {
	// TODO: Update profile picture
	try {
		const res = await fetch(
			`http://localhost:5000/profile/${id}/information`,
			{
				method: "GET",
				credentials: "include",
			}
		);
		const msg = await res.json();
		if (!res.ok) {
			throw new Error("Something went wrong please try again later");
		}

		populateProfile(msg);
	} catch (err) {
		alert("Profile information could not be found");
		return;
	}
}

function editProfile() {
	editProfileButton.disabled = true;
	updateProfileButton.disabled = false;
	selectProfilePictureButton.disabled = false;
	textBoxes.forEach((cur) => (cur.readOnly = false));
	workoutsPerWeek.disabled = false;
	for (const box of Object.keys(dayCheckboxes)) {
		dayCheckboxes[box].disabled = false;
	}
	deleteProfileButton.disabled = false;
}

async function updateProfile() {
	deleteProfileButton.disabled = true;
	editProfileButton.disabled = false;
	updateProfileButton.disabled = true;
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
		const msg = await res.json();
		if (!res.ok) {
			throw new Error("Something went wrong please try again later");
		}

		populateProfile(msg);
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
					body: JSON.stringify({ dataURL: profilePicture }),
				}
			);
			const msg = await res.json();

			// TODO: Update Profile Picture
			if (!res.ok) {
				throw new Error("Something went wrong please try again later");
			}
		} catch (err) {
			alert("Profile Image changes could not be saved");
			return;
		}
	}
}

function populateProfile(profileObject) {
	firstName.value = profileObject["firstName"];
	lastName.value = profileObject["lastName"];
	phoneNumber.value = profileObject["phoneNumber"];
	workoutStyle.value = profileObject["workoutStyle"];
	workoutsPerWeek.value = profileObject["workoutsPerWeek"];
	workoutLength.value = profileObject["averageWorkoutLength"];
	preferredTime.value = profileObject["preferredTime"];
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
	json["preferredTime"] = preferredTime.value;
	json["preferredDays"] = [];
	for (const dayKey of Object.keys(dayCheckboxes)) {
		if (dayCheckboxes[dayKey].checked === true) {
			json["preferredDays"].push(dayKey);
		}
	}
	return json;
}

async function deleteProfile() {
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
		const msg = await res.json();
		if (!res.ok) {
			throw new Error("Something went wrong please try again later");
		}
		user.logout();
		window.location.replace("http://localhost:5000/public/index.html");
	} catch (err) {
		alert("Issue deleting profile. Please try again later.");
		return;
	}
}
