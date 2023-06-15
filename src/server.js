import dotenv from "dotenv";
dotenv.config();
import express from "express";
// import verifyAccess from "./middlewares/verifyAccess.js";
import cors from "cors";
import router from "./../src/routes/index.js";
import loginRouter from "./routes/login.js";
import newsRouter from "./routes/news.js";
import appialsRouter from "./routes/appeals.js";
import publicRouter from "./routes/publicRoutes.js";

const app = express();

const PORT = process.env.PORT || 9999;

app.use(cors());
app.use(express.json());
// app.use(loginRouter);
// app.use(newsRouter);
// app.use(appialsRouter);
app.use([publicRouter, loginRouter, newsRouter, appialsRouter]);
// app.use(verifyAccess);
app.use(router);

app.listen(PORT, console.log(PORT));
