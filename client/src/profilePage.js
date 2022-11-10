const editProfileButton = document.getElementById("editProfile");
const updateProfileButton = document.getElementById("updateProfile");
const selectProfilePictureButton = document.getElementById(
	"selectProfilePicture"
);
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

const textBoxes = [
	firstName,
	lastName,
	phoneNumber,
	workoutStyle,
	workoutLength,
	preferredTime,
];
// Validate user?

editProfileButton.addEventListener("click", editProfile);
updateProfileButton.addEventListener("click", updateProfile);

const id = 12; // UPDATE
initialize(id);

async function initialize(id) {
	// If not logged in? redirect to log in page
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
		//display dropdown
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
}

function updateProfile() {
	editProfileButton.disabled = false;
	updateProfileButton.disabled = true;
	selectProfilePictureButton.disabled = true;
	textBoxes.forEach((cur) => (cur.readOnly = "readonly"));
	workoutsPerWeek.disabled = true;
	for (const box of Object.keys(dayCheckboxes)) {
		dayCheckboxes[box].disabled = true;
	}
	// Send Update API Call
}

function populateProfile(profileObject) {
	firstName.value = profileObject["firstName"];
	lastName.value = profileObject["lastName"];
	phoneNumber.value = profileObject["phoneNumber"];
	workoutStyle.value = profileObject["workoutStyle"];
	workoutsPerWeek.value = profileObject["workoutsPerWeek"];
	workoutLength.value = profileObject["averageWorkoutLength"];
	preferredTime.value = profileObject["preferredTime"];
	for (const day in profileObject["preferredDays"]) {
		dayCheckboxes[day].checked = true;
	}
}
