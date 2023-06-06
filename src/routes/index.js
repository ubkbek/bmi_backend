import { Router } from "express";
import coursesRouter from "./courses.js";
import usersRouter from "./users.js";
import groupsRouter from "./groups.js";

const router = Router();

router.use([coursesRouter, usersRouter, groupsRouter]);

export default router;
