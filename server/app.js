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
import { matchHistoryRouter } from "./routes/matchHistory-routes.js";
import mongoose from "mongoose";

mongoose.connect(
	`mongodb+srv://psi:psi@cluster0.k8otxuo.mongodb.net/?retryWrites=true&w=majority`
);

const userSchema = new mongoose.Schema({
	id: String,
	email: String,
	password: String,
	fName: String,
	lName: String,
	profilePic: String,
	phoneNumber: String,
	workoutStyle: String,
	workoutsPerWeek: Number,
	avgWorkoutLength: Number,
	startTime: String,
	endTime: String,
	prefDays: String,
	pastWorkouts: [
		{
			id: String,
			date: String,
			workoutTitle: String,
			workout: [String],
		},
	],
	rating: Number,
	numberOfRatings: Number,
	matches: [String],
	blocked: [String],
});

export const User = new mongoose.model("User", userSchema);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static(__dirname + "/"));

app.use("/auth", authRoutes);

app.use("/matchHistory", matchHistoryRouter);

// profile routes
app.use("/profile", profileRoutes);

// match routes
app.use("/matches", matchRoutes);

app.listen(process.env.PORT || 5000, (req, res) => {
	console.log("listening on port 5000");
});
