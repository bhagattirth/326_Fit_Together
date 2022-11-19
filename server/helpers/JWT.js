import pkg from "jsonwebtoken";
const { sign, verify } = pkg;
import dotenv from "dotenv";
dotenv.config();

// creates jwt token and returns it
export const createToken = (id) => {
	// create jwt token
	const accessToken = sign({ id }, `${process.env.SECRET}`);

	// return created token
	return accessToken;
};

export const validateToken = (req, res, next) => {
	// get access token from cookies
	const accessToken = req.cookies["accessToken"];

	// if it doesn't exist, not valid
	if (!accessToken) {
		return res.status(400).json({ message: "No cookie found" });
	}

	// verify token
	try {
		const valid = verify(accessToken, `${process.env.SECRET}`);

		if (valid) {
			req.authenticated = true;
			return next();
		}
	} catch (err) {
		return res.status(400).json({ message: err });
	}
};
