import pkg from "jsonwebtoken";
const { sign, verify } = pkg;

// creates jwt token and returns it
export const createToken = (user) => {
	// create jwt token
	const accessToken = sign({ id: "123987" }, "JWTSECRETCHANGELATERENVFILE");

	return accessToken;
};

export const validateToken = (req, res, next) => {
	const accessToken = req.cookies["accessToken"];
	console.log(req.cookies);
	console.log(accessToken);
	if (!accessToken) {
		return res.status(400).json({ message: "No cookie found" });
	}

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
