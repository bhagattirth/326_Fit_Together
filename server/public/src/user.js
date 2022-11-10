class User {
	constructor() {
		this.userId = null;
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
}

const user = new User();
export default user;
