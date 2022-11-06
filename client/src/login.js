const email = document.getElementById("email");
const pass = document.getElementById("password");
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
	const re = /^(?=.*[0-9_\W]).+$/;
	return re.test(password);
	// 8 char long, lowercase, uppercase, special char or number
};

// login user
const loginUser = (e) => {
	if (e.target.tagName !== "BUTTON") return;
	e.stopPropagation();

	if (!validateEmail(email.value)) {
		alert("invalid email");
		return;
	}

	if (!validatePassword(pass.value)) {
		alert("invalid password");
		return;
	}

	// make it here, post req to backend
	// then redirect upon success
};

// sign up user
const signupUser = async (e) => {
	if (e.target.tagName !== "BUTTON") return;
	e.stopPropagation();

	if (!validateEmail(email.value)) {
		alert("invalid email");
		return;
	}

	if (!validatePassword(pass.value)) {
		alert("invalid password");
		return;
	}

	const res = await fetch("http://localhost:5000/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email: email.value, password: pass.value }),
	});
	const msg = await res.json();
	console.log(msg);

	// make it here, create post request to backend
	// then redirect upon success`
};

signupBtn.addEventListener("click", signupUser);
loginBtn.addEventListener("click", loginUser);
