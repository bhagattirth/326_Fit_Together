class User {
	constructor(userId) {
		this.userId = userId;
	}

	logout() {
		this.userId = null;
	}

	getUserId() {
		return this.userId;
	}
}

const user = new User();
export default user;
