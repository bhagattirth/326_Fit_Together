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
	const id = await user.checkToken();

	if (!id) {
		return;
	}
	user.setUserId(id);

	const imageLink = await user.getProfilePicture();

	if (!imageLink) {
		alert("failed to load profile picture");
	}

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
