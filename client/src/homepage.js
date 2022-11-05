// when script laods probably check if user has logged in before, prob use json web tokens

const loginBtn = document.getElementById("login-btn");

// redirect user to login page when clicking on login btn
loginBtn.addEventListener("click", () => {
	location.href = "login.html";
});
