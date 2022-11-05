import express from "express";
import cors from "cors";
import { loginRoutes } from "./routes/login-route.js";

const app = express();
app.use(cors());
app.use(express.json());

// login route
app.use("/login", loginRoutes);

app.listen(5000, (req, res) => {
	console.log("listening on port 5000");
});
