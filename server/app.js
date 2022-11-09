import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRoutes } from "./routes/auth-routes.js";
import{matchHistoryRouter} from "./routes/matchHistory-routes.js";




const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

// auth routes
// app.use("/auth", authRoutes);


app.use(express.static('./public'));
app.use(express.urlencoded({extended:false}));


app.use("/", matchHistoryRouter);


app.listen(5000, (req, res) => {
	console.log("listening on port 5000");
});
