import express from "express";
import questionsRouter from "./root/questions.mjs";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./utils/swagger.mjs"; // นำเข้าไฟล์ที่สร้างในขั้นตอนก่อนหน้า

const app = express();
const port = 4000;

app.use(express.json());

// ตั้งค่า Swagger UI ที่ /api-docs

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/questions", questionsRouter);
app.use("/answers", questionsRouter);

app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
