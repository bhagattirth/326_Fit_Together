const urlBase = "http://localhost:5000";
const email = document.getElementById("email");
const pass = document.getElementById("password");

const newEmail = document.getElementById("newEmail");
const confirmEmail = document.getElementById("confirmEmail");
const newPass = document.getElementById("newPassword");
const confirmPass = document.getElementById("confirmPassword");
const fName = document.getElementById("firstName");
const lName = document.getElementById("lastName");

const loginBtn = document.getElementById("login");
const signupBtn = document.getElementById("signup");
import user from "./user.js";

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

	// email validation
	if (!validateEmail(email.value)) {
		alert("invalid email");
		return;
	}

	// password validation
	if (!validatePassword(pass.value)) {
		alert("invalid password");
		return;
	}

	// attempt to log user in
	try {
		const res = await fetch(`${urlBase}/auth/login`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: email.value, password: pass.value }),
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

	// redirect back to homepage here
	location.href = "profile.html";
};

// sign up user
const signupUser = async (e) => {
	if (e.target.id !== "signup") return;
	e.stopPropagation();

	// email validation
	if (!validateEmail(newEmail.value)) {
		alert("invalid email");
		return;
	}

	// password validation
	if (!validatePassword(newPass.value)) {
		alert(
			"invalid password, must contain 8 characters, 1 uppercase, 1 lowercase, and 1 special or number"
		);
		return;
	}

	// check user entered a first name
	if (fName.value.trim().length === 0) {
		alert("Please enter you're first name");
		return;
	}

	// check user entered last name
	if (lName.value.trim().length === 0) {
		alert("Please enter you're last name");
		return;
	}

	// check users emails match
	if (newEmail.value !== confirmEmail.value) {
		alert("Emails don't match");
		return;
	}

	// check users passwords match
	if (newPass.value !== confirmPass.value) {
		alert("Passwords don't match");
		return;
	}

	// attempt to sign user up
	try {
		const res = await fetch(`${urlBase}/auth/signup`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: newEmail.value,
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
