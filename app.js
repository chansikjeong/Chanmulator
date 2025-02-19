import express from "express";
import UsersRouter from "./routes/user.route.js";
import CharacterRouter from "./routes/character.route.js";
import ItemRouter from "./routes/item.route.js";
import ErrorHandlerMiddleware from "./middleware/errorHandler.middleware.js";

const app = express();
const PORT = 3019;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", [UsersRouter, CharacterRouter, ItemRouter]);
app.use(ErrorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});
