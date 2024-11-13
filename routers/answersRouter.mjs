import express from "express";
import connectionPool from "../utils/db.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
  const { title, category, content } = req.query;
  let query = `
    SELECT answers.id, answers.question_id,
           questions.title as question_title,
           answers.content as answer,
           answers.created_at, answers.updated_at,
           COALESCE(SUM(CASE WHEN av.vote = 1 THEN 1 ELSE 0 END), 0) as upvotes,
           COALESCE(SUM(CASE WHEN av.vote = -1 THEN 1 ELSE 0 END), 0) as downvotes
    FROM answers
    JOIN questions ON answers.question_id = questions.id
    LEFT JOIN answer_votes av ON answers.id = av.answer_id
    WHERE 1=1`;
  const params = [];

  if (title) {
    query += ` AND questions.title ILIKE $${params.length + 1}`;
    params.push(`%${title}%`);
  }

  if (category) {
    query += ` AND questions.category ILIKE $${params.length + 1}`;
    params.push(`%${category}%`);
  }

  if (content) {
    query += ` AND answers.content ILIKE $${params.length + 1}`;
    params.push(`%${content}%`);
  }

  query += `
    GROUP BY answers.id, questions.id
    ORDER BY answers.id`;

  try {
    const result = await connectionPool.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "404 Not Found: Answers not found for the given criteria",
      });
    }

    return res.status(200).json({
      message: "200 OK: Successfully retrieved the list of answers.",
      data: result.rows.map((answer) => ({
        id: answer.id,
        question_id: answer.question_id,
        question_title: answer.question_title,
        answer: answer.answer,
        created_at: answer.created_at,
        updated_at: answer.updated_at,
        upvotes: parseInt(answer.upvotes),
        downvotes: parseInt(answer.downvotes),
      })),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server could not process the request due to database issue.",
    });
  }
});

router.post("/:id/upvote", async (req, res) => {
  const { id } = req.params;

  try {
    const answerResult = await connectionPool.query(
      `SELECT * FROM answers WHERE id = $1`,
      [id]
    );

    if (answerResult.rows.length === 0) {
      return res.status(404).json({
        message: "Answer not found",
      });
    }

    await connectionPool.query(
      `INSERT INTO answer_votes (answer_id, vote)
       VALUES ($1, 1)`,
      [id]
    );

    const upvoteCountResult = await connectionPool.query(
      `SELECT COUNT(*) AS upvotes FROM answer_votes WHERE answer_id = $1 AND vote = 1`,
      [id]
    );

    const downvoteCountResult = await connectionPool.query(
      `SELECT COUNT(*) AS downvotes FROM answer_votes WHERE answer_id = $1 AND vote = -1`,
      [id]
    );

    const upvotes = upvoteCountResult.rows[0].upvotes;
    const downvotes = downvoteCountResult.rows[0].downvotes;

    return res.status(200).json({
      message: "Successfully upvoted the answer",
      id: answerResult.rows[0].id,
      question_id: answerResult.rows[0].question_id,
      content: answerResult.rows[0].content,
      upvotes: parseInt(upvotes, 10),
      downvotes: parseInt(downvotes, 10),
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Server could not process the upvote request",
    });
  }
});

export default router;
