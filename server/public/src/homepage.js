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
	console.log(msg);
	// change page
	const html = `<div class="dropdown">
			<img
				class="user-icon dropdown-toggle"
				data-bs-toggle="dropdown"
				src="https://penntoday.upenn.edu/sites/default/files/2021-11/Taylor%20Swift-Main.jpg"
				alt="user icon"
			/>
			<ul class="dropdown-menu">
				<li>
					<a class="dropdown-item" href="#">
						Profile
					</a>
				</li>
				<li>
					<a class="dropdown-item" href="#">
						Settings
					</a>
				</li>
			</ul>
		</div>`;
	const wrapper = document.createElement("div");
	wrapper.innerHTML = html;

	loginBtn.parentNode.insertBefore(wrapper, loginBtn);
	loginBtn.remove();
};

checkToken();
