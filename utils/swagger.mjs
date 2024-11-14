// utils/swagger.mjs
import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Question & Answer API",
      version: "1.0.0",
      description: "API documentation for Question and Answer system",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./root/questions.mjs"], // ตรวจสอบว่าเส้นทางถูกต้อง
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
export default swaggerSpec;
