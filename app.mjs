import express from "express";
import questionsRouter from "./router/questions.mjs";

const app = express();
const port = 4000;

app.use(express.json());
app.use("/questions", questionsRouter);

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
