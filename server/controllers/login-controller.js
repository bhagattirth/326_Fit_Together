import bcrypt from "bcrypt";

export const loginUser = (req, res, next) => {
	// do something to log user in
};

export const signupUser = async (req, res, next) => {
	const { email, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	console.log(email, hashedPassword);

	// create user here
	res.status(200).send({ message: "user created" });
};
