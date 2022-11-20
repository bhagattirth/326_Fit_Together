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
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(
	`mongodb+srv://psi:${process.env.PASSWORD}@cluster0.k8otxuo.mongodb.net/?retryWrites=true&w=majority`
);

const userSchema = new mongoose.Schema({
	id: String,
	email: String,
	password: String,
	fName: String,
	lName: String,
	profilePic: {
		type: String,
		default:
			"https://penntoday.upenn.edu/sites/default/files/2021-11/Taylor%20Swift-Main.jpg",
	},
	phoneNumber: { type: String, default: "000-000-0000" },
	workoutStyle: { type: String, default: "None" },
	workoutsPerWeek: { type: Number, default: 0 },
	avgWorkoutLength: { type: Number, default: 0 },
	startTime: { type: String, default: "00:00AM" },
	endTime: { type: String, default: "00:00AM" },
	prefDays: { type: String, default: "0000000" },
	pastWorkouts: [
		{
			id: String,
			date: [String],
			workoutTitle: [String],
			workout: [[String]],
			rating: String
		},
	],
	rating: Number,
	numberOfRatings: Number,
	oneWayMatches: [String],
	twoWayMatches: [String],
	rating: { type: Number, default: 0 },
	numberOfRatings: { type: Number, default: 0 },
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
