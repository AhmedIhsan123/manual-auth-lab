import express from "express";
import defaultRouter from "./routers/routes.js";
import session from "express-session";

//configure Express.js app
const app = express();

//view engine
app.set("view engine", "ejs");
app.set("views", "src/views");

//static directories
app.use(express.static("public"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	}),
);

//routers
app.use("/", defaultRouter);

export default app;
