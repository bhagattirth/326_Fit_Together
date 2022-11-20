// email validation
export const validateEmail = (email) => {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};

// password validation
export const validatePassword = (password) => {
	const re = /^(?=.*[0-9_\W]).+$/;
	return re.test(password);
	// 8 char long, lowercase, uppercase, special char or number
};
