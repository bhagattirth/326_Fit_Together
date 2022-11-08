"use strict";
import express from "express";
import { addWorkoutToUser, getXPastUser, updateRating, deleteEntry, getPreference } from "../controllers/matchHistory-controller.js";



let router = express.Router();
router.get("/getPast/:number", getXPastUser);

router.get("/getPreference", getPreference);

router.post("/addWorkout", addWorkoutToUser);

router.post("/rating", updateRating);

//Not working
router.delete("/delete", deleteEntry);




export{router as matchHistoryRouter};