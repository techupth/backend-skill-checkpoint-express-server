import express from "express";
import connectionPool from "../utils/db.mjs";
// import {validateQuestions} from "../middlewares/questions.validation.mjs";

const router = express.Router();

// router.post("/", [validateQuestions], async (req, res) => {
router.post("/", async (req, res) => {
  const questions = {
    ...req.body,
    created_at: new Date(),
    updated_at: new Date(),
    published_at: new Date(),
  };

  try {
    await connectionPool.query(
      `INSERT INTO questions (title, description, category, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        questions.title,
        questions.description,
        questions.category,
        questions.created_at,
        questions.updated_at,
      ]
    );
    return res.status(201).json({ message: "Created question successfully" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Server could not create question due to database error",
    });
  }
});

router.get("/:id", async (req, res) => {
  const questionId = req.params.id;

  try {
    const result = await connectionPool.query(
      `SELECT * FROM questions WHERE id = $1`,
      [questionId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    const question = result.rows[0];
    return res.status(200).json({
      message: "Successfully retrieved the question",
      id: question.id,
      title: question.title,
      description: question.description,
      category: question.category,
      created_at: question.created_at,
      updated_at: question.updated_at,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Server could not retrieve question",
    });
  }
});

router.put("/:id", async (req, res) => {
  const questionId = req.params.id;
  const { title, description, category } = req.body;

  if (!title && !description && !category) {
    return res.status(400).json({
      message: "Missing title description or category in request body",
    });
  }

  try {
    const result = await connectionPool.query(
      `SELECT * FROM questions WHERE id = $1`,
      [questionId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    const updateQuery = `
      UPDATE questions
      SET title = COALESCE($1, title), 
          description = COALESCE($2, description),
          category = COALESCE($3, category),
          updated_at = NOW()
      WHERE id = $4
    `;

    await connectionPool.query(updateQuery, [
      title,
      description,
      category,
      questionId,
    ]);

    return res.status(200).json({
      message: "Successfully updated the question",
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Server could not update question",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const questionResult = await connectionPool.query(
      `SELECT * FROM questions WHERE id = $1`,
      [id]
    );

    if (questionResult.rows.length === 0) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    await connectionPool.query(`DELETE FROM answers WHERE question_id = $1`, [
      id,
    ]);

    await connectionPool.query(`DELETE FROM questions WHERE id = $1`, [id]);

    return res.status(200).json({
      message: "Question and its answers deleted successfully.",
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Server could not delete question and answers",
    });
  }
});

router.get("/", async (req, res) => {
  const { title, category } = req.query;
  let query = `SELECT id, title, description, category, created_at, updated_at FROM questions WHERE 1=1`;
  const params = [];

  if (title) {
    query += ` AND title ILIKE $${params.length + 1}`;
    params.push(`%${title}%`);
  }

  if (category) {
    query += ` AND category ILIKE $${params.length + 1}`;
    params.push(`%${category}%`);
  }

  try {
    const result = await connectionPool.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "404 Not Found: Question not found",
      });
    }

    return res.status(200).json({
      message: "200 OK: Successfully retrieved the list of questions.",
      data: result.rows.map((question) => ({
        id: question.id,
        title: question.title,
        description: question.description,
        category: question.category,
        created_at: question.created_at,
        updated_at: question.updated_at,
      })),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server could not process the request due to database issue.",
    });
  }
});

export default router;
