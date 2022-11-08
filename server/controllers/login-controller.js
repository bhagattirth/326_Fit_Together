import bcrypt from "bcrypt";
import { createToken } from "../helpers/JWT.js";

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
		return;
	}

	const token = createToken({ id: "2398423940" });
	res.cookie("accessToken", token, { maxAge: 60 * 60 * 24 * 30 * 1000 });
	res.status(200).send({ message: "Logged in" });
};

export const signupUser = async (req, res, next) => {
	const { email, password } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	console.log(email, hashedPassword);

	// create user here
	const token = createToken({ id: "238974327" });
	res.cookie("accessToken", token, { maxAge: 60 * 60 * 24 * 30 * 1000 });
	res.status(200).send({ message: "user created" });
};

export const validateUser = (req, res, next) => {
	if (req.authenticated) {
		console.log("here");
		res.status(200).send({ message: "valid token" });
	} else {
		res.status(400).send({ message: "Not valid" });
	}
};

export const logoutUser = (req, res, next) => {
	if (req.cookies["accessToken"]) {
		res.cookie("accessToken", "", {
			secure: true,
			httpOnly: true,
			sameSite: "none",
			maxAge: 0,
		});
		res.status(200).json({ message: "cookie destroyed" });
	} else {
		res.status(400).json({ message: "No cookie found" });
	}
};
