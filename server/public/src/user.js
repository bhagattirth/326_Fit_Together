class User {
	constructor() {
		this.userId = null;
		this.pm = {}; // Potential Matches
	}

	async logout() {
		const res = await fetch("http://localhost:5000/auth/logout", {
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
