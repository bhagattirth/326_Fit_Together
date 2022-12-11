import { modal } from "./htmlElements.js";
import user from "./user.js";

const urlBase = "http://localhost:5000";
const email = document.getElementById("email");
const pass = document.getElementById("password");

const newEmail = document.getElementById("newEmail");
const newPass = document.getElementById("newPassword");
const confirmPass = document.getElementById("confirmPassword");
const fName = document.getElementById("firstName");
const lName = document.getElementById("lastName");

const loginBtn = document.getElementById("login");
const signupBtn = document.getElementById("signup");

// email validation
const validateEmail = (email) => {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};

// password validation
const validatePassword = (password) => {
	// 8 char long, lowercase, uppercase, special char or number
	const re = /^(?=.*[0-9_\W]).+$/;

	return re.test(password);
};

// login user
const loginUser = async (e) => {
	if (e.target.id !== "login") return;
	e.stopPropagation();

	let valid = true;

	// email validation
	if (!validateEmail(email.value)) {
		const emailLabel = document.getElementById("email-label");
		const text = document.getElementById("email-error-text");
		text.hidden = false;
		emailLabel.style.color = "red";
		email.style.border = "1px solid red";
		valid = false;
	} else {
		const emailLabel = document.getElementById("email-label");
		const text = document.getElementById("email-error-text");
		emailLabel.style.color = "black";
		text.hidden = true;
		email.style.border = "None";
		email.style.borderBottom =
			"var(--uiFieldBorderWidth) solid var(--uiFieldBorderColorActive)";
	}

	// password validation
	if (!validatePassword(pass.value)) {
		const text = document.getElementById("password-error-text");
		const passwordLabel = document.getElementById("password-label");
		text.hidden = false;
		passwordLabel.style.color = "red";
		pass.style.border = "1px solid red";
		valid = false;
	} else {
		const text = document.getElementById("password-error-text");
		const passwordLabel = document.getElementById("password-label");
		text.hidden = true;
		passwordLabel.style.color = "black";
		pass.style.border = "None";
		pass.style.borderBottom =
			"var(--uiFieldBorderWidth) solid var(--uiFieldBorderColorActive)";
	}

	// if either pass or email validation fails, exit function
	if (!valid) return;

	// attempt to log user in
	try {
		const res = await fetch(`${urlBase}/auth/login`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: email.value.toLowerCase(),
				password: pass.value,
			}),
		});
		const msg = await res.json();

		if (!res.ok) {
			throw new Error("Invalid email/password combination");
		}

		// update User with userId returned
		user.setUserId(msg.id);
	} catch (err) {
		const text = document.getElementById("error-text");
		text.hidden = false;
		return;
	}

	const text = document.getElementById("error-text");
	text.hidden = false;

	// redirect back to homepage here
	location.href = "index.html";
};

// sign up user
const signupUser = async (e) => {
	if (e.target.id !== "signup") return;
	e.stopPropagation();

	let valid = true;

	// email validation
	if (!validateEmail(newEmail.value)) {
		const text = document.getElementById("signup-email-error-text");
		const emailText = document.getElementById("signup-email-text");
		text.hidden = false;
		emailText.style.color = "red";
		newEmail.style.border = "1px solid red";
		valid = false;
	} else {
		const text = document.getElementById("signup-email-error-text");
		const emailText = document.getElementById("signup-email-text");
		text.hidden = true;
		emailText.style.color = "black";
		newEmail.style.border = "None";
		newEmail.style.borderBottom =
			"var(--uiFieldBorderWidth) solid var(--uiFieldBorderColorActive)";
	}

	// password validation
	if (!validatePassword(newPass.value)) {
		const text = document.getElementById("signup-password-error-text");
		const passText = document.getElementById("signup-password-text");
		text.hidden = false;
		passText.style.color = "red";
		newPass.style.border = "1px solid red";
		valid = false;
	} else {
		const text = document.getElementById("signup-password-error-text");
		const passText = document.getElementById("signup-password-text");
		text.hidden = true;
		passText.style.color = "black";
		newPass.style.border = "None";
		newPass.style.borderBottom =
			"var(--uiFieldBorderWidth) solid var(--uiFieldBorderColorActive)";
	}

	// check user entered a first name
	if (fName.value.trim().length === 0) {
		const text = document.getElementById("first-name-error-text");
		const fNameText = document.getElementById("first-name-text");
		text.hidden = false;
		fNameText.style.color = "red";
		fName.style.border = "1px solid red";
		valid = false;
	} else {
		const text = document.getElementById("first-name-error-text");
		const fNameText = document.getElementById("first-name-text");
		text.hidden = true;
		fNameText.style.color = "black";
		fName.style.border = "None";
		fName.style.borderBottom =
			"var(--uiFieldBorderWidth) solid var(--uiFieldBorderColorActive)";
	}

	// check user entered last name
	if (lName.value.trim().length === 0) {
		const text = document.getElementById("last-name-error-text");
		const lNameText = document.getElementById("last-name-text");
		text.hidden = false;
		lNameText.style.color = "red";
		lName.style.border = "1px solid red";
		valid = false;
	} else {
		const text = document.getElementById("last-name-error-text");
		const lNameText = document.getElementById("last-name-text");
		text.hidden = true;
		lNameText.style.color = "black";
		lName.style.border = "None";
		lName.style.borderBottom =
			"var(--uiFieldBorderWidth) solid var(--uiFieldBorderColorActive)";
	}

	// check users passwords match
	if (newPass.value !== confirmPass.value) {
		const text = document.getElementById("confirm-password-error-text");
		const confPassText = document.getElementById("confirm-password-text");
		confPassText.style.color = "red";
		text.hidden = false;
		confirmPass.style.border = "1px solid red";
		valid = false;
	} else {
		const text = document.getElementById("confirm-password-error-text");
		const confPassText = document.getElementById("confirm-password-text");
		confirmPass.style.border = "None";
		confirmPass.style.borderBottom =
			"var(--uiFieldBorderWidth) solid var(--uiFieldBorderColorActive)";
		confPassText.style.color = "black";
		text.hidden = true;
	}

	if (!valid) return;

	// attempt to sign user up
	try {
		const res = await fetch(`${urlBase}/auth/signup`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: newEmail.value.toLowerCase(),
				password: newPass.value,
				fName: fName.value,
				lName: lName.value,
			}),
		});
		const msg = await res.json();

		if (!res.ok) {
			throw new Error("Something went wrong please try again later");
		}

		// Update user with userId returned, subject to change
		user.setUserId(msg.id);
	} catch (err) {
		//display dropdown
		alert("Failed to sign up");
		return;
	}

	//redirect user back to homepage here
	location.href = "profile.html";
};

signupBtn.addEventListener("click", signupUser);
loginBtn.addEventListener("click", loginUser);
