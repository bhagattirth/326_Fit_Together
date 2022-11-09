import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/auth-routes.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { profileRoutes } from "./routes/profile-routes.js";
import { matchRoutes } from "./routes/match-routes.js";

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5500" }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname + "/"));

// auth routes
app.use("/auth", authRoutes);

// profile routes
app.use("/profile", profileRoutes);

// match routes
app.use("/matches", matchRoutes);

app.listen(5000, (req, res) => {
	console.log("listening on port 5000");
});
