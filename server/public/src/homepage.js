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
	console.log(user.getUserId());
	// fetch image link for user
	const imgRes = await fetch(
		`http://localhost:5000/profile/${user.getUserId()}/picture`,
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
	logoutBtn.addEventListener("click", user.logout);
};

checkToken();
