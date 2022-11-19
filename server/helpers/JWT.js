import pkg from "jsonwebtoken";
const { sign, verify } = pkg;

// creates jwt token and returns it
export const createToken = (id) => {
	// create jwt token
	const accessToken = sign({ id }, "JWTSECRETCHANGELATERENVFILE");

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
		const valid = verify(accessToken, "JWTSECRETCHANGELATERENVFILE");

		if (valid) {
			req.authenticated = true;
			return next();
		}
	} catch (err) {
		return res.status(400).json({ message: err });
	}
};
