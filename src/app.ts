import "express-async-errors";
import express, { Application, json } from "express";
import { handleError } from "./errors";
import { userRoutes } from "./routers/users.route";

export const app: Application = express();
app.use(express.json());

app.use("/users", userRoutes);

app.use(handleError);
