import { Router } from "express";
import login from "../modules/login/login.js";

const loginRouter = Router();

loginRouter.post("/login", login.login);

export default loginRouter;
