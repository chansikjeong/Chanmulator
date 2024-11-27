import express from "express";
import UsersRouter from "./routes/user.route.js";
import ErrorHandlerMiddleware from "./middleware/errorHandler.middleware.js";

const app = express();
const PORT = 3019;

app.use(express.json());
app.use("/api", [UsersRouter]);
app.use(ErrorHandlerMiddleware);
app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});
