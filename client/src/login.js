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
		const res = await fetch("http://localhost:5000/auth/login", {
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
	} catch (err) {
		const text = document.getElementById("error-text");
		text.hidden = false;
		return;
	}

	// redirect back to homepage here
	location.href = "index.html";
};

// sign up user
const signupUser = async (e) => {
	if (e.target.id !== "signup") return;
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

	// attempt to sign user up
	try {
		const res = await fetch("http://localhost:5000/auth/signup", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: email.value, password: pass.value }),
		});
		const msg = await res.json();

		if (!res.ok) {
			throw new Error("Something went wrong please try again later");
		}
	} catch (err) {
		//display dropdown
		return;
	}

	//redirect user back to homepage here
	location.href = "index.html";
};

signupBtn.addEventListener("click", signupUser);
loginBtn.addEventListener("click", loginUser);
