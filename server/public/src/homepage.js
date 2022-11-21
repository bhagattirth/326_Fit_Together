import user from "./user.js";
const urlBase = "http://localhost:5000";
const loginBtn = document.getElementById("login-btn");
const findAFitBtn = document.getElementById("findAFitLargeButton");

// redirect user to login page when clicking on login btn
loginBtn.addEventListener("click", () => {
	location.href = "login.html";
});

// redirect user to "Find a Fit" when button selected
findAFitBtn.addEventListener("click", () => {
	location.href = "matchingPage.html";
});

const checkToken = async () => {
	// check if token is valid
	const res = await fetch(`${urlBase}/auth/validateUser`, {
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
		`${urlBase}/profile/${user.getUserId()}/picture`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}
	);
	// if res is not ok, alert user that image failed to load
	if (!res.ok) {
		alert("failed to load profile image");
	}
	const resJSON = await imgRes.json();
	const imageLink = resJSON.profilePic;

	// change page
	const html = `<div id='profile-dropdown' class="dropdown">
			<img
				class="user-icon dropdown-toggle"
				data-bs-toggle="dropdown"
				src="${imageLink}"
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
					<a id="Matches" class="dropdown-item" href="matchHistory.html">
						Matches
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
	wrapper.classList.add("dropdown");
	wrapper.innerHTML = html;

	loginBtn.parentNode.insertBefore(wrapper, loginBtn);
	loginBtn.remove();

	findAFitBtn.disabled = false;
	const logoutBtn = document.getElementById("logout");
	logoutBtn.addEventListener("click", user.logout);
};

checkToken();
