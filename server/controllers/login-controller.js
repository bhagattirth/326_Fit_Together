import bcrypt from "bcrypt";

export const loginUser = async (req, res, next) => {
	// do something to log user in
	const { email, password } = req.body;

	// look for user with matching email, if not found return error

	if (false) {
		res.status(400).send({ message: "User doesn't exist" });
	}

	// with found user, check that password matches, if not return error
	const valid = await bcrypt.compare(password, "DATABASE PASSWORD");

	if (!valid) {
		res.status(400).send({ message: "Invalid password" });
	}
};

export const signupUser = async (req, res, next) => {
	const { email, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	console.log(email, hashedPassword);

	// create user here
	res.status(200).send({ message: "user created" });
};
