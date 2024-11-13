import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { validateCreateQuestionData } from "../middlewares/question.validation.mjs";

const questionsRouter = Router();

questionsRouter.post("/", [validateCreateQuestionData], async (req, res) => {
  const newQuestions = req.body;
  console.log(newQuestions);

  try {
    await connectionPool.query(
      `INSERT INTO questions (title, description, category)
         VALUES ($1, $2, $3) RETURNING id`,
      [newQuestions.title, newQuestions.description, newQuestions.category]
    );

    // ส่งคำตอบว่าโพสต์ถูกสร้างสำเร็จ
    return res.status(201).json({
      message: `Question created successfully`,
    });
  } catch (error) {
    if (
      !newAssignments.title ||
      !newAssignments.description ||
      !newAssignments.category
    ) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }
    return res.status(500).json({
      message: "Unable to create question.",
    });
  }
});

questionsRouter.get("/", async (req, res) => {
  try {
    const result = await connectionPool.query(
      `SELECT id, title, category, description FROM questions`
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No questions found" });
    }
    return res.json({
      data: result.rows,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Unable to fetch questions.`,
    });
  }
});

questionsRouter.get("/:Id", async (req, res) => {
  try {
    const questionsIdFromClient = req.params.Id;
    const results = await connectionPool.query(
      `
          SELECT * FROM questions WHERE id = $1
          `,
      [questionsIdFromClient]
    );
    if (!results.rows[0]) {
      return res.status(404).json({
        message: `Question not found.`,
      });
    }
    return res.status(201).json({
      data: results.rows[0],
    });
  } catch (e) {
    return res.status(500).json({
      message: "Unable to fetch questions.",
      error: e.message,
    });
  }
});

questionsRouter.put("/:Id", [validateCreateQuestionData], async (req, res) => {
  const questionsIdFromClient = req.params.Id;
  const updatedQuestions = req.body;
  try {
    const result = await connectionPool.query(
      `
          update questions
          set title =$2,
          description = $3,
          category = $4
          where id =$1
          `,
      [
        questionsIdFromClient,
        updatedQuestions.title,
        updatedQuestions.description,
        updatedQuestions.category,
      ]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Question not found.",
      });
    }

    return res.status(200).json({
      message: "Update post successfully",
    });
  } catch (error) {
    if (
      !updatedQuestions.title ||
      !updatedQuestions.description ||
      !updatedQuestions.category
    ) {
      return res.status(400).json({
        message: "Invalid request data.",
      });
    }
    console.error(error);
    return res.status(500).json({
      message: "Unable to fetch questions.",
    });
  }
});

questionsRouter.delete("//:Id", async (req, res) => {
  const questionsIdFromClient = req.params.Id;
  try {
    const result = await connectionPool.query(
      `delete from questions
          where id = $1`,
      [questionsIdFromClient]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Question not found.",
      });
    }

    return res.status(200).json({
      message: "Question post has been deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to delete question.",
    });
  }
});

export default questionsRouter;
