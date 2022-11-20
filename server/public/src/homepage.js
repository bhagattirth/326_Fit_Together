import user from "./user.js";
const loginBtn = document.getElementById("login-btn");

// redirect user to login page when clicking on login btn
loginBtn.addEventListener("click", () => {
	location.href = "login.html";
});

const checkToken = async () => {
	// check if token is valid
	const res = await fetch("http://localhost:5000/auth/validateUser", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	// if not valid, return
	if (!res.ok) {
		return;
	}
	const msg = await res.json();
	// update user id here
	user.setUserId(msg.id);

	// fetch image link for user
	const imgRes = await fetch(
		`http://localhost:5000/profile/${user.id}/picture`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	const imageLink = await imgRes.json();

	// if res is not ok, alert user that image failed to load
	if (!res.ok) {
		alert("failed to load profile image");
	}

	// change page
	const html = `<div id='profile-dropdown' class="dropdown">
			<img
				class="user-icon dropdown-toggle"
				data-bs-toggle="dropdown"
				src=${imageLink.picture}
				alt="user icon"
			/>
			<ul class="dropdown-menu">
				<li>
					<a id="profile" class="dropdown-item" href="profile.html">
						Profile
					</a>
				</li>
				<li>
					<a id="findFit" class="dropdown-item" href="matchingPage.html">
						Find a Fit!
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

	const logoutBtn = document.getElementById("logout");
	logoutBtn.addEventListener("click", user.logout);
};

checkToken();
