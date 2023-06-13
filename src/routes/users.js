import { Router } from "express";
const usersRouter = Router();
import usersController from "../modules/users/users.js";

usersRouter
  .get("/users", usersController.ALL_USERS)
  .get("/teachers", usersController.GET_TEACHERS)
  .get("/students", usersController.GET_STUDENTS)
  .post("/teachers", usersController.CREATE_TEACHER)
  .post("/graduates", usersController.CREATE_GRADUATE)
  .post("/students", usersController.CREATE_STUDENT)
  .put("/users/:id", usersController.UPDATE_USER)
  .delete("/users/:id", usersController.DELETE_USER);

export default usersRouter;
