const urlBase = "http://localhost:5000";
class User {
	constructor() {
		this.userId = null;
		this.pm = {}; // Potential Matches
	}

	async logout() {
		const res = await fetch(`${urlBase}/auth/logout`, {
			method: "POST",
			credentials: "include",
			headers: { "Content-type": "application/json" },
			body: null,
		});

		const msg = await res.json();

		if (res.ok) {
			this.userId = null;
			location.href = "index.html";
		} else {
			alert("failed to logout");
		}
	}

	async checkToken() {
		// check if token is valid
		const res = await fetch(`${urlBase}/auth/validateUser`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		// if not valid, return null
		if (!res.ok) {
			return null;
		}

		const msg = await res.json();

		// update user id here
		return msg.id;
	}

	async getProfilePicture() {
		// fetch image link for user
		const res = await fetch(`${urlBase}/profile/${this.userId}/picture`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		// if res is not ok, alert user that image failed to load
		if (!res.ok) {
			return null;
		}

		const parsedRes = await res.json();
		return parsedRes.profilePic;
	}

	getUserId() {
		return this.userId;
	}

	setUserId(id) {
		this.userId = id;
	}

	setPotentialMatches(jsonObject) {
		this.pm = jsonObject;
	}

	getPotentialMatches(amount) {
		const keys = Object.keys(this.pm);
		const out = {};
		for (let i = 0; i < amount && i < keys.length; i++) {
			out[keys[i]] = this.pm[keys[i]];
			delete this.pm[keys[i]];
		}
		return out;
	}
}

const user = new User();
export default user;
