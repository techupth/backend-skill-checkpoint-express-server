import express from "express";
import questionsRouter from "./routers/questionsRouter.mjs";
import answersRouter from "./routers/answersRouter.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use("/questions", questionsRouter);
app.use("/answers", answersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
