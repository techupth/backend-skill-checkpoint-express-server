import express from "express";
import connectionPool from "./utils/db.mjs"; //อย่าลืมimport-*-
const app = express();
const port = 4000;

app.use(express.json());

app.get("/test", (req, res) => {
  return res.json("Server API is working 🐒");
});
//
// POST a new question
app.post("/questions", async (req, res) => {
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

// GET all questions
app.get("/questions", async (req, res) => {
  try {
    const result = await connectionPool.query(`SELECT * FROM questions`);
    return res.status(200).json({
      message: "Successfully retrieved the list of questions",
      questions: result.rows,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Server could not retrieve questions",
    });
  }
});

//get question id

app.get("/questions/:id", async (req, res) => {
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

//put question
app.put("/questions/:id", async (req, res) => {
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
//delete question
app.delete("/questions/:id", async (req, res) => {
  const questionId = req.params.id;

  try {
    const result = await connectionPool.query(
      `DELETE FROM questions WHERE id = $1 RETURNING *`,
      [questionId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    return res.status(200).json({
      message: "Question deleted successfully",
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Server could not delete question",
    });
  }
});

// get question by title or category
app.get("/questions", async (req, res) => {
  const title = req.query.title ? `%${req.query.title}%` : null;
  const category = req.query.category ? `%${req.query.category}%` : null;

  try {
    const result = await connectionPool.query(
      `
        SELECT id, title, description, category, created_at, updated_at
        FROM questions
        WHERE (title ILIKE $1 OR $1 IS NULL) AND
                (category ILIKE $2 OR $2 IS NULL)
        `,
      [title, category]
    );

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

// // GET all answers
// app.get("/answers", async (req, res) => {
//   try {
//     const result = await connectionPool.query(`SELECT * FROM answers`);
//     return res.json(result.rows);
//   } catch (e) {
//     console.error(e);
//     return res.status(500).json({
//       message: "Server could not retrieve answers",
//     });
//   }
// });

//
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
