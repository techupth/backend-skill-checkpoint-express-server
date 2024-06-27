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

// import express from "express";
// import connectionPool from "./utils/db.mjs"; //อย่าลืมimport-*-
// import { validateQuestions } from "./middlewares/questions.vaildation.mjs";
// const app = express();
// const port = 4000;

// app.use(express.json());

// app.get("/test", (req, res) => {
//   return res.json("Server API is working 🐒");
// });
// //
// // POST a new question
// app.post("/questions", [validateQuestions], async (req, res) => {
//   const questions = {
//     ...req.body,
//     created_at: new Date(),
//     updated_at: new Date(),
//     published_at: new Date(),
//   };
//   try {
//     await connectionPool.query(
//       `INSERT INTO questions (title, description, category, created_at, updated_at)
//        VALUES ($1, $2, $3, $4, $5)`,
//       [
//         questions.title,
//         questions.description,
//         questions.category,
//         questions.created_at,
//         questions.updated_at,
//       ]
//     );
//     return res.status(201).json({ message: "Created question successfully" });
//   } catch (e) {
//     console.error(e);
//     return res.status(500).json({
//       message: "Server could not create question due to database error",
//     });
//   }
// });

// // GET all questions ทำเพิ่มใน optinal
// // app.get("/questions", async (req, res) => {
// //   try {
// //     const result = await connectionPool.query(`SELECT * FROM questions`);
// //     return res.status(200).json({
// //       message: "Successfully retrieved the list of questions",
// //       questions: result.rows,
// //     });
// //   } catch (e) {
// //     console.error(e);
// //     return res.status(500).json({
// //       message: "Server could not retrieve questions",
// //     });
// //   }
// // });

// //get question id

// app.get("/questions/:id", async (req, res) => {
//   const questionId = req.params.id;

//   try {
//     const result = await connectionPool.query(
//       `SELECT * FROM questions WHERE id = $1`,
//       [questionId]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({
//         message: "Question not found",
//       });
//     }

//     const question = result.rows[0];
//     return res.status(200).json({
//       message: "Successfully retrieved the question",
//       id: question.id,
//       title: question.title,
//       description: question.description,
//       category: question.category,
//       created_at: question.created_at,
//       updated_at: question.updated_at,
//     });
//   } catch (e) {
//     console.error(e);
//     return res.status(500).json({
//       message: "Server could not retrieve question",
//     });
//   }
// });

// //put question
// app.put("/questions/:id", async (req, res) => {
//   const questionId = req.params.id;
//   const { title, description, category } = req.body;

//   if (!title && !description && !category) {
//     return res.status(400).json({
//       message: "Missing title description or category in request body",
//     });
//   }

//   try {
//     const result = await connectionPool.query(
//       `SELECT * FROM questions WHERE id = $1`,
//       [questionId]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({
//         message: "Question not found",
//       });
//     }

//     const updateQuery = `
//       UPDATE questions
//       SET title = COALESCE($1, title),
//           description = COALESCE($2, description),
//           category = COALESCE($3, category),
//           updated_at = NOW()
//       WHERE id = $4
//     `;

//     await connectionPool.query(updateQuery, [
//       title,
//       description,
//       category,
//       questionId,
//     ]);

//     return res.status(200).json({
//       message: "Successfully updated the question",
//     });
//   } catch (e) {
//     console.error(e);
//     return res.status(500).json({
//       message: "Server could not update question",
//     });
//   }
// });
// //delete question ทำเพิ่ม optinal แล้ว
// // app.delete("/questions/:id", async (req, res) => {
// //   const questionId = req.params.id;

// //   try {
// //     const result = await connectionPool.query(
// //       `DELETE FROM questions WHERE id = $1 RETURNING *`,
// //       [questionId]
// //     );

// //     if (result.rows.length === 0) {
// //       return res.status(404).json({
// //         message: "Question not found",
// //       });
// //     }

// //     return res.status(200).json({
// //       message: "Question deleted successfully",
// //     });
// //   } catch (e) {
// //     console.error(e);
// //     return res.status(500).json({
// //       message: "Server could not delete question",
// //     });
// //   }
// // });

// // get question by title or category
// app.get("/questions", async (req, res) => {
//   const { title, category } = req.query;
//   let query = `SELECT id, title, description, category, created_at, updated_at FROM questions WHERE 1=1`;
//   const params = [];

//   if (title) {
//     query += ` AND title ILIKE $${params.length + 1}`;
//     params.push(`%${title}%`);
//   }

//   if (category) {
//     query += ` AND category ILIKE $${params.length + 1}`;
//     params.push(`%${category}%`);
//   }

//   try {
//     const result = await connectionPool.query(query, params);

//     if (result.rows.length === 0) {
//       return res.status(404).json({
//         message: "404 Not Found: Question not found",
//       });
//     }

//     return res.status(200).json({
//       message: "200 OK: Successfully retrieved the list of questions.",
//       data: result.rows.map((question) => ({
//         id: question.id,
//         title: question.title,
//         description: question.description,
//         category: question.category,
//         created_at: question.created_at,
//         updated_at: question.updated_at,
//       })),
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message: "Server could not process the request due to database issue.",
//     });
//   }
// });
// //get answer ทำเพิ่ม
// app.get("/answers", async (req, res) => {
//   const { title, category, content } = req.query;
//   let query = `
//     SELECT answers.id, answers.question_id,
//            questions.title as question_title,
//            answers.content as answer,
//            answers.created_at, answers.updated_at,
//            COALESCE(SUM(CASE WHEN av.vote = 1 THEN 1 ELSE 0 END), 0) as upvotes,
//            COALESCE(SUM(CASE WHEN av.vote = -1 THEN 1 ELSE 0 END), 0) as downvotes
//     FROM answers
//     JOIN questions ON answers.question_id = questions.id
//     LEFT JOIN answer_votes av ON answers.id = av.answer_id
//     WHERE 1=1`;
//   const params = [];

//   if (title) {
//     query += ` AND questions.title ILIKE $${params.length + 1}`;
//     params.push(`%${title}%`);
//   }

//   if (category) {
//     query += ` AND questions.category ILIKE $${params.length + 1}`;
//     params.push(`%${category}%`);
//   }

//   if (content) {
//     query += ` AND answers.content ILIKE $${params.length + 1}`;
//     params.push(`%${content}%`);
//   }

//   query += `
//     GROUP BY answers.id, questions.id
//     ORDER BY answers.id`;

//   try {
//     const result = await connectionPool.query(query, params);

//     if (result.rows.length === 0) {
//       return res.status(404).json({
//         message: "404 Not Found: Answers not found for the given criteria",
//       });
//     }

//     return res.status(200).json({
//       message: "200 OK: Successfully retrieved the list of answers.",
//       data: result.rows.map((answer) => ({
//         id: answer.id,
//         question_id: answer.question_id,
//         question_title: answer.question_title,
//         answer: answer.answer,
//         created_at: answer.created_at,
//         updated_at: answer.updated_at,
//         upvotes: parseInt(answer.upvotes),
//         downvotes: parseInt(answer.downvotes),
//       })),
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message: "Server could not process the request due to database issue.",
//     });
//   }
// });

// //post answer for specific question
// app.post("/questions/:id/answers", async (req, res) => {
//   const { id } = req.params;
//   const { content } = req.body;

//   if (!content || typeof content !== "string") {
//     return res.status(400).json({
//       message: "Missing or invalid request data",
//     });
//   }

//   try {
//     const newAnswer = {
//       question_id: id,
//       content,
//       created_at: new Date(),
//       updated_at: new Date(),
//     };

//     const result = await connectionPool.query(
//       `INSERT INTO answers (question_id, content, created_at, updated_at)
//        VALUES ($1, $2, $3, $4)
//        RETURNING *`,
//       [
//         newAnswer.question_id,
//         newAnswer.content,
//         newAnswer.created_at,
//         newAnswer.updated_at,
//       ]
//     );

//     const createdAnswer = result.rows[0];

//     return res.status(201).json({
//       message: "Answer created successfully",
//       id: createdAnswer.id,
//       question_id: createdAnswer.question_id,
//       content: createdAnswer.content,
//       created_at: createdAnswer.created_at,
//       updated_at: createdAnswer.updated_at,
//     });
//   } catch (e) {
//     console.error(e);
//     return res.status(500).json({
//       message: "Server could not create answer",
//     });
//   }
// });

// //put answer ทำเพิ่ม
// app.put("/answers/:id", async (req, res) => {
//   const { id } = req.params;
//   const { content } = req.body;

//   // Validate request data
//   if (!content || typeof content !== "string") {
//     return res.status(400).json({
//       message: "Missing or invalid request data",
//     });
//   }

//   try {
//     // Check if the answer exists
//     const checkAnswerQuery = `
//       SELECT *
//       FROM answers
//       WHERE id = $1`;
//     const checkAnswerParams = [id];
//     const checkAnswerResult = await connectionPool.query(
//       checkAnswerQuery,
//       checkAnswerParams
//     );

//     if (checkAnswerResult.rows.length === 0) {
//       return res.status(404).json({
//         message: "404 Not Found: Answer not found",
//       });
//     }

//     // Update the answer content
//     const updateAnswerQuery = `
//       UPDATE answers
//       SET content = $1,
//           updated_at = NOW()
//       WHERE id = $2
//       RETURNING *`;
//     const updateAnswerParams = [content, id];
//     const updatedAnswerResult = await connectionPool.query(
//       updateAnswerQuery,
//       updateAnswerParams
//     );

//     const updatedAnswer = updatedAnswerResult.rows[0];

//     return res.status(200).json({
//       message: "200 OK: Successfully updated the answer",
//       id: updatedAnswer.id,
//       content: updatedAnswer.content,
//       created_at: updatedAnswer.created_at,
//       updated_at: updatedAnswer.updated_at,
//     });
//   } catch (error) {
//     console.error("Error updating answer:", error);
//     return res.status(500).json({
//       message: "Server could not update the answer",
//     });
//   }
// });

// //Get Answer for specific question
// app.get("/questions/:id/answers", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const questionResult = await connectionPool.query(
//       `SELECT * FROM questions WHERE id = $1`,
//       [id]
//     );

//     if (questionResult.rows.length === 0) {
//       return res.status(404).json({
//         message: "Answer not found",
//       });
//     }

//     const answerResult = await connectionPool.query(
//       `SELECT * FROM answers WHERE question_id = $1`,
//       [id]
//     );

//     const answers = answerResult.rows;

//     return res.status(200).json(answers);
//   } catch (e) {
//     console.error(e);
//     return res.status(500).json({
//       message: "Server could not retrieve answers",
//     });
//   }
// });
// // delete question and answer in question
// app.delete("/questions/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const questionResult = await connectionPool.query(
//       `SELECT * FROM questions WHERE id = $1`,
//       [id]
//     );

//     if (questionResult.rows.length === 0) {
//       return res.status(404).json({
//         message: "Question not found",
//       });
//     }

//     await connectionPool.query(`DELETE FROM answers WHERE question_id = $1`, [
//       id,
//     ]);

//     await connectionPool.query(`DELETE FROM questions WHERE id = $1`, [id]);

//     return res.status(200).json({
//       message: "Question and its answers deleted successfully.",
//     });
//   } catch (e) {
//     console.error(e);
//     return res.status(500).json({
//       message: "Server could not delete question and answers",
//     });
//   }
// });

// //upvote question
// app.post("/questions/:id/upvote", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const questionResult = await connectionPool.query(
//       `SELECT * FROM questions WHERE id = $1`,
//       [id]
//     );

//     if (questionResult.rows.length === 0) {
//       return res.status(404).json({
//         message: "Question not found",
//       });
//     }

//     await connectionPool.query(
//       `INSERT INTO question_votes (question_id, vote)
//        VALUES ($1, 1)`,
//       [id]
//     );

//     const upvoteCountResult = await connectionPool.query(
//       `SELECT COUNT(*) AS upvotes FROM question_votes WHERE question_id = $1 AND vote = 1`,
//       [id]
//     );

//     const downvoteCountResult = await connectionPool.query(
//       `SELECT COUNT(*) AS downvotes FROM question_votes WHERE question_id = $1 AND vote = -1`,
//       [id]
//     );

//     const upvotes = upvoteCountResult.rows[0].upvotes;
//     const downvotes = downvoteCountResult.rows[0].downvotes;

//     return res.status(200).json({
//       message: "Successfully upvoted the question",
//       id: questionResult.rows[0].id,
//       title: questionResult.rows[0].title,
//       description: questionResult.rows[0].description,
//       category: questionResult.rows[0].category,
//       created_at: questionResult.rows[0].created_at,
//       updated_at: questionResult.rows[0].updated_at,
//       upvotes: parseInt(upvotes, 10),
//       downvotes: parseInt(downvotes, 10),
//     });
//   } catch (e) {
//     console.error("Error occurred during upvote:", e);
//     return res.status(500).json({
//       message: "Server could not upvote the question",
//     });
//   }
// });

// //downvote question
// app.post("/questions/:id/downvote", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const questionResult = await connectionPool.query(
//       `SELECT * FROM questions WHERE id = $1`,
//       [id]
//     );

//     if (questionResult.rows.length === 0) {
//       return res.status(404).json({
//         message: "Question not found",
//       });
//     }

//     await connectionPool.query(
//       `INSERT INTO question_votes (question_id, vote)
//        VALUES ($1, -1)`,
//       [id]
//     );

//     const upvoteCountResult = await connectionPool.query(
//       `SELECT COUNT(*) AS upvotes FROM question_votes WHERE question_id = $1 AND vote = 1`,
//       [id]
//     );

//     const downvoteCountResult = await connectionPool.query(
//       `SELECT COUNT(*) AS downvotes FROM question_votes WHERE question_id = $1 AND vote = -1`,
//       [id]
//     );

//     const upvotes = upvoteCountResult.rows[0].upvotes;
//     const downvotes = downvoteCountResult.rows[0].downvotes;

//     return res.status(200).json({
//       message: "Successfully downvoted the question",
//       id: questionResult.rows[0].id,
//       title: questionResult.rows[0].title,
//       description: questionResult.rows[0].description,
//       category: questionResult.rows[0].category,
//       created_at: questionResult.rows[0].created_at,
//       updated_at: questionResult.rows[0].updated_at,
//       upvotes: parseInt(upvotes, 10),
//       downvotes: parseInt(downvotes, 10),
//     });
//   } catch (e) {
//     console.error("Error occurred during downvote:", e);
//     return res.status(500).json({
//       message: "Server could not downvote the question",
//     });
//   }
// });
// //upvote answer
// app.post("/answers/:id/upvote", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const answerResult = await connectionPool.query(
//       `SELECT * FROM answers WHERE id = $1`,
//       [id]
//     );

//     if (answerResult.rows.length === 0) {
//       return res.status(404).json({
//         message: "Answer not found",
//       });
//     }

//     await connectionPool.query(
//       `INSERT INTO answer_votes (answer_id, vote)
//        VALUES ($1, 1)`,
//       [id]
//     );

//     const upvoteCountResult = await connectionPool.query(
//       `SELECT COUNT(*) AS upvotes FROM answer_votes WHERE answer_id = $1 AND vote = 1`,
//       [id]
//     );

//     const downvoteCountResult = await connectionPool.query(
//       `SELECT COUNT(*) AS downvotes FROM answer_votes WHERE answer_id = $1 AND vote = -1`,
//       [id]
//     );

//     const upvotes = upvoteCountResult.rows[0].upvotes;
//     const downvotes = downvoteCountResult.rows[0].downvotes;

//     return res.status(200).json({
//       message: "Successfully upvoted the answer",
//       id: answerResult.rows[0].id,
//       question_id: answerResult.rows[0].question_id,
//       content: answerResult.rows[0].content,
//       upvotes: parseInt(upvotes, 10),
//       downvotes: parseInt(downvotes, 10),
//     });
//   } catch (e) {
//     console.error("Error occurred during upvote:", e);
//     return res.status(500).json({
//       message: "Server could not upvote the answer",
//     });
//   }
// });

// //downvote answer
// app.post("/answers/:id/downvote", async (req, res) => {
//   const answerId = req.params.id;

//   try {
//     const answerResult = await connectionPool.query(
//       "SELECT * FROM answers WHERE id = $1",
//       [answerId]
//     );

//     if (answerResult.rows.length === 0) {
//       return res.status(404).json({
//         message: "404 Not Found: Answer not found",
//       });
//     }

//     await connectionPool.query(
//       "INSERT INTO answer_votes (answer_id, vote) VALUES ($1, -1)",
//       [answerId]
//     );

//     const voteCounts = await connectionPool.query(
//       "SELECT " +
//         "SUM(CASE WHEN vote = 1 THEN 1 ELSE 0 END) AS upvotes, " +
//         "SUM(CASE WHEN vote = -1 THEN 1 ELSE 0 END) AS downvotes " +
//         "FROM answer_votes WHERE answer_id = $1",
//       [answerId]
//     );

//     return res.status(200).json({
//       message: "200 OK: Successfully downvoted the answer.",
//       data: {
//         id: answerResult.rows[0].id,
//         question_id: answerResult.rows[0].question_id,
//         content: answerResult.rows[0].content,
//         created_at: answerResult.rows[0].created_at,
//         updated_at: answerResult.rows[0].updated_at,
//         upvotes: voteCounts.rows[0].upvotes,
//         downvotes: voteCounts.rows[0].downvotes,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message: "Server could not process the request due to database issue.",
//     });
//   }
// });

// //
// app.listen(port, () => {
//   console.log(`Server is running at ${port}`);
// });
