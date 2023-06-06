import { Router } from "express";
const newsRouter = Router();
import news from "../modules/news/news.js";

newsRouter
  .get("/news", news.GET)
  .post("/news", news.POST)
  .delete("/news/:id", news.DELETE);

export default newsRouter;
