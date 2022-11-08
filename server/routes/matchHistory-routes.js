"use strict";
import express from "express";
import { addWorkoutToUser, getXPastUser, updateRating } from "../controllers/matchHistory-controller.js";



let router = express.Router();
router.get("/getPast/:number", getXPastUser);

router.post("/addWorkout", addWorkoutToUser);

router.post("/rating", updateRating);

router.delete("/deleteEntry", removeEntry);



export{router as matchHistoryRouter};