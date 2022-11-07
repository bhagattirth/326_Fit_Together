// when script laods probably check if user has logged in before, prob use json web tokens

const loginBtn = document.getElementById("login-btn");

// redirect user to login page when clicking on login btn
loginBtn.addEventListener("click", () => {
	location.href = "login.html";
});

const checkToken = async () => {
	console.log("validating...");
	const res = await fetch("http://localhost:5000/auth/validateUser", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) {
		return;
	}
	const msg = await res.json();
	// change page
};

checkToken();
