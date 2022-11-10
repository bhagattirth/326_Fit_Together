import user from "./user.js";
const loginBtn = document.getElementById("login-btn");

// redirect user to login page when clicking on login btn
loginBtn.addEventListener("click", () => {
	location.href = "login.html";
});

const logout = async () => {
	const res = await fetch(`https://ufit12.herokuapp.com/auth/logout`, {
		method: "POST",
		credentials: "include",
		headers: { "Content-type": "application/json" },
		body: null,
	});

	const msg = await res.json();

	if (res.ok) {
		user.logout();
		location.href = "index.html";
	} else {
		alert("failed to logout");
	}
};

const checkToken = async () => {
	console.log("validating...");
	console.log(`https://ufit12.herokuapp.com/auth/validateUser`);
	const res = await fetch(`https://ufit12.herokuapp.com/auth/validateUser`, {
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
	// update user id here, subject to change
	user.setUserId(1);
	// change page
	const html = `<div id='profile-dropdown' class="dropdown">
			<img
				class="user-icon dropdown-toggle"
				data-bs-toggle="dropdown"
				src="https://penntoday.upenn.edu/sites/default/files/2021-11/Taylor%20Swift-Main.jpg"
				alt="user icon"
			/>
			<ul class="dropdown-menu">
				<li>
					<a id="profile" class="dropdown-item" href="#">
						Profile
					</a>
				</li>
				<li>
					<a id="logout" class="dropdown-item" href="#">
						Log out
					</a>
				</li>
			</ul>
		</div>`;
	const wrapper = document.createElement("div");
	wrapper.innerHTML = html;

	loginBtn.parentNode.insertBefore(wrapper, loginBtn);
	loginBtn.remove();

	const profileBtn = document.getElementById("profile");
	profileBtn.addEventListener("click", () => {
		location.href = "profile.html";
	});

	const logoutBtn = document.getElementById("logout");
	logoutBtn.addEventListener("click", logout);
};

checkToken();
