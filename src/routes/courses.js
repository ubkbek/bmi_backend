import courses from "./../modules/courses/courses.js";
import express from "express";

const coursesRouter = express.Router();

coursesRouter
  .post("/courses", courses.POST)
  .get("/courses", courses.GET)
  .get("/course_teachers/:id", courses.GET_COURSE_TEACHERS)
  .delete("/courses/:id", courses.DELETE)
  .put("/courses/:id", courses.PUT);

export default coursesRouter;
