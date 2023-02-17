import "express-async-errors";
import express, { Application, json } from "express";
import { handleError } from "./errors";
import { userRoutes } from "./routers/users.route";
import { loginRoutes } from "./routers/login.route";

export const app: Application = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/login", loginRoutes);

app.use(handleError);
