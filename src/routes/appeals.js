import { Router } from "express";
import appials from "../modules/appeals/appeals.js";

const appialsRouter = Router();

appialsRouter
  .get("/appeals", appials.GET)
  .post("/appeals", appials.POST)
  .put("/appeals/:id", appials.PUT);

export default appialsRouter;
