import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { validateCreateQuestionData } from "../middlewares/question_validation.mjs";

const questionsRouter = Router();

//API questions CREATE - Question
questionsRouter.post("/", [validateCreateQuestionData], async (req, res) => {
  const newPost = {
    ...req.body,
  };

  try {
    const result = await connectionPool.query(
      `insert into questions (title, description, category) values ($1, $2, $3) RETURNING id`,
      [newPost.title, newPost.description, newPost.category]
    );

    const questionId = result.rows[0].id;

    return res.status(201).json({
      message: `Question id: ${questionId} created successfully.`,
    });
  } catch (e) {
    return res.status(500).json({
      message: `Unable to create question ${e}`,
    });
  }
});

//API questions READ - All
questionsRouter.get("/", async (req, res) => {
  let results;
  try {
    results = await connectionPool.query(`select * from questions`);
  } catch (e) {
    return res.status(500).json({
      message: `Unable to fetch questions ${e}`,
    });
  }

  return res.status(200).json({
    data: results.rows,
  });
});

//API questions READ - ID
questionsRouter.get("/:id", async (req, res) => {
  const questionFromClient = req.params.id;

  let result;
  try {
    result = await connectionPool.query(
      `select * from questions where id = $1`,
      [questionFromClient]
    );

    if (!result.rows[0]) {
      return res.status(404).json({
        message: `Question not found
        (question id: ${questionFromClient})`,
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: `Unable to fetch questions ${e}`,
    });
  }
  return res.status(200).json({
    data: result.rows[0],
  });
});

//API question UPDATE
questionsRouter.put("/:id", [validateCreateQuestionData], async (req, res) => {
  const questionIDFromClient = req.params.id;
  const updatedQuestion = { ...req.body };

  try {
    const query = `
        update questions
        set
        title = $2,
        description = $3,
        category = $4
        where
        id = $1
        `;

    const value = [
      questionIDFromClient,
      updatedQuestion.title,
      updatedQuestion.description,
      updatedQuestion.category,
    ];

    const result = await connectionPool.query(query, value);

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: `Question not found.
          (post id: ${questionIDFromClient})`,
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: `Unable to fetch questions. ${e}`,
    });
  }

  return res.status(200).json({
    message: "Question updated successfully.",
  });
});

//API question DELETE
questionsRouter.delete("/:id", async (req, res) => {
  const questionIdFromClient = req.params.id;

  try {
    const query = `
    delete from questions where id = $1
    `;
    const values = [questionIdFromClient];
    const result = await connectionPool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: `Question not found. (question id: ${questionIdFromClient})`,
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: `Unable to delete question. ${e}`,
    });
  }

  return res.status(200).json({
    message: `Question id: ${questionIdFromClient} has been deleted successfully`,
  });
});

export default questionsRouter;
