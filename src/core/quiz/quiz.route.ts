import { Router } from "express";
import startQuizController from "./controllers/startQuiz.controller";
import createQuizController from "./controllers/createQuiz.controller";
import isAdmin from "../../middlewares/is-admin";
import getQuizController from "./controllers/getQuiz.controller";
import endQuizController from "./controllers/endQuiz.controller";
import deleteQuizController from "./controllers/deleteQuiz.controller";
import leaderboardController from "./controllers/leaderboard.controller";

const quizRoute = Router();

quizRoute.get("/", getQuizController);
quizRoute.post("/start", startQuizController);
quizRoute.post("/create", isAdmin, createQuizController);
quizRoute.post("/end", endQuizController);


quizRoute.delete("/:id", deleteQuizController);
quizRoute.get("/leaderboard", leaderboardController);

export default quizRoute;
