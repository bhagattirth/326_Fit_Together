import express from "express";
import cors from "cors";
import { authRoutes } from "./routes/auth-routes.js";

const app = express();
app.use(cors());
app.use(express.json());

// auth routes
app.use("/auth", authRoutes);

app.listen(5000, (req, res) => {
	console.log("listening on port 5000");
});
