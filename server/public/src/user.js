class User {
	constructor() {
		this.userId = null;
		this.pm = {}; // Potential Matches
	}

	logout() {
		this.userId = null;
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
