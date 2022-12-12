import user from "./user.js";
const urlBase = "https://ufit12.herokuapp.com";
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
	// get user id
	const id = await user.checkToken();

	// if id is falsey, then no valid access token, return
	if (!id) {
		return;
	}

	// set user id
	user.setUserId(id);

	// retreive image link
	const imageLink = await user.getProfilePicture();

	// if fail to load pfp, use default link
	if (!imageLink) {
		imageLink =
			"https://penntoday.upenn.edu/sites/default/files/2021-11/Taylor%20Swift-Main.jpg";
	}

	// create profile dropdown
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

	// insert profile dropdown inside of wrapper element
	const wrapper = document.createElement("div");
	wrapper.classList.add("dropdown");
	wrapper.innerHTML = html;

	// insert wrapper into dom
	loginBtn.parentNode.insertBefore(wrapper, loginBtn);

	// remove login btn
	loginBtn.remove();

	findAFitBtn.disabled = false;

	// add functionality to logout btn
	const logoutBtn = document.getElementById("logout");
	logoutBtn.addEventListener("click", user.logout);
};

// check access token everytime page loads
checkToken();
