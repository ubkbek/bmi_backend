import { Router } from "express";
import couresController from "./../modules/courses/courses.js";
import news from "../modules/news/news.js";
import users from "../modules/users/users.js";

const publicRouter = Router();

publicRouter
  .get("/public_courses", couresController.GET)
  .get("/public_news", news.GET)
  .get("/graduates", users.GET_GRADUATES)
  .get("/public_teachers", users.GET_TEACHERS);

export default publicRouter;
