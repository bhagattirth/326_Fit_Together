import bcrypt from "bcrypt";
import { createToken } from "../helpers/JWT.js";
import { User } from "../app.js";
import uniqid from "uniqid";

export const loginUser = (req, res, next) => {
	// email and password user entered
	const { email, password } = req.body;
	let valid;

	// look for user with matching email
	User.findOne({ email: email }, async (err, user) => {
		if (err) {
			res.status(404).send({ message: err });
		} else if (!user) {
			res.status(400).send({ message: "Email doesn't exist" });
		} else {
			valid = await bcrypt.compare(password, user.password);

			// if password not valid, let client know pass is invalid
			if (!valid) {
				res.status(400).send({ message: "Invalid password" });
				return;
			}

			// create login token
			const token = createToken(user.id);
			console.log(`token: ${token}`);

			// create cookie containing access token
			res.cookie("accessToken", token, {
				maxAge: 60 * 60 * 24 * 30 * 1000,
			});
			// send message back to server letting client know user is logged in
			res.status(200).send({ id: user.id });
		}
	});
};

export const signupUser = async (req, res, next) => {
	// email and password from user
	const { email, password, fName, lName } = req.body;
	console.log(
		`email: ${email}, pass: ${password}, fName: ${fName}, lName: ${lName}`
	);
	// verify they are valid

	// hash password
	const hashedPassword = await bcrypt.hash(password, 10);

	// create new user
	const newUser = new User({
		id: uniqid(),
		email,
		password: hashedPassword,
		fName,
		lName,
	});

	newUser.save((err) => {
		if (err) {
			// do somethign
		} else {
			// create user here
			const token = createToken(newUser.id);
			// store cookie
			res.cookie("accessToken", token, {
				maxAge: 60 * 60 * 24 * 30 * 1000,
			});
			// respond to server
			res.status(200).send({ id: newUser.id });
		}
	});
};

export const validateUser = (req, res, next) => {
	if (req.authenticated) {
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
