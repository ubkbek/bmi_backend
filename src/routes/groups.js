import groupsController from "../modules/groups/groups.js";
import { Router } from "express";
const groupsRouter = Router();

groupsRouter
  .post("/groups", groupsController.CREATE)
  .get("/groups", groupsController.ALL_GROUPS)
  .get("/teacher/groups", groupsController.GET_TEACHER_GROUPS)
  .get("/teacher/groups/:id", groupsController.GET_COURSE_GROUPS)
  .put("/groups/:id", groupsController.UPDATE)
  .delete("/groups/:id", groupsController.DELETE);

export default groupsRouter;
