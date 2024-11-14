import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { validateCreateQuestionData } from "../middlewares/question_validation.mjs";
import { validateAnswerContent } from "../middlewares/content_validation.mjs";
import { validateVoteData } from "../middlewares/vote_validation.mjs";
const questionsRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: API for managing questions and answers
 */

/**
 * @swagger
 * /questions/search:
 *   get:
 *     summary: Search questions by title or category
 *     tags: [Questions]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Title of the question to search
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Category of the question to search
 *     responses:
 *       200:
 *         description: List of matching questions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 *       400:
 *         description: Invalid search parameters
 *       500:
 *         description: Unable to fetch a question
 */

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: Create a new question
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuestionInput'
 *     responses:
 *       201:
 *         description: Question created successfully
 *       500:
 *         description: Unable to create question
 */

/**
 * @swagger
 * /questions:
 *   get:
 *     summary: Get all questions
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: List of all questions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 *       500:
 *         description: Unable to fetch questions
 */

/**
 * @swagger
 * /questions/{id}:
 *   get:
 *     summary: Get a question by ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the question to fetch
 *     responses:
 *       200:
 *         description: Question details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       404:
 *         description: Question not found
 *       500:
 *         description: Unable to fetch question
 */

/**
 * @swagger
 * /questions/{id}:
 *   put:
 *     summary: Update a question
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the question to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuestionInput'
 *     responses:
 *       200:
 *         description: Question updated successfully
 *       404:
 *         description: Question not found
 *       500:
 *         description: Unable to update question
 */

/**
 * @swagger
 * /questions/{id}:
 *   delete:
 *     summary: Delete a question
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the question to delete
 *     responses:
 *       200:
 *         description: Question deleted successfully
 *       404:
 *         description: Question not found
 *       500:
 *         description: Unable to delete question
 */

/**
 * @swagger
 * /questions/{id}/answers:
 *   post:
 *     summary: Answer a question
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the question to answer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnswerInput'
 *     responses:
 *       201:
 *         description: Answer created successfully
 *       404:
 *         description: Question not found
 *       500:
 *         description: Unable to create answer
 */

/**
 * @swagger
 * /questions/{id}/answers:
 *   get:
 *     summary: Get answers for a specific question
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the question to retrieve answers for
 *     responses:
 *       200:
 *         description: List of answers for the question
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Answer'
 *       404:
 *         description: No answers found for question
 *       500:
 *         description: Unable to fetch answers
 */

/**
 * @swagger
 * /questions/{questionId}/vote:
 *   post:
 *     summary: Vote on a question
 *     tags: [Votes]
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the question to vote on
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VoteInput'
 *     responses:
 *       201:
 *         description: Vote registered successfully
 *       404:
 *         description: Question not found
 *       500:
 *         description: Unable to register vote
 */

/**
 * @swagger
 * /answers/{answerId}/vote:
 *   post:
 *     summary: Vote on an answer
 *     tags: [Votes]
 *     parameters:
 *       - in: path
 *         name: answerId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the answer to vote on
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VoteInput'
 *     responses:
 *       201:
 *         description: Vote registered successfully
 *       404:
 *         description: Answer not found
 *       500:
 *         description: Unable to register vote
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         category:
 *           type: string
 *     QuestionInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - category
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         category:
 *           type: string
 *     Answer:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         question_id:
 *           type: integer
 *         content:
 *           type: string
 *     AnswerInput:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         content:
 *           type: string
 *     VoteInput:
 *       type: object
 *       required:
 *         - vote
 *       properties:
 *         vote:
 *           type: integer
 *           enum: [1, -1]
 *           description: Upvote (1) or downvote (-1)
 */

// API Search
questionsRouter.get("/search", async (req, res) => {
  const { title, category } = req.query;
  // ตรวจสอบว่าอย่างน้อยหนึ่งในสองพารามิเตอร์นี้ต้องถูกส่งมา
  if (!title && !category) {
    return res.status(400).json({
      message: "Invalid search parameters.",
    });
  }

  try {
    // สร้างเงื่อนไข SQL ตามพารามิเตอร์ที่มี
    let query = "SELECT * FROM questions WHERE ";
    const values = [];
    if (title) {
      query += "title LIKE $1 ";
      values.push(`%${title}%`);
    }
    if (category) {
      if (values.length > 0) query += "AND "; // เพิ่ม AND หากมีเงื่อนไข title อยู่แล้ว
      query += "category LIKE $2 ";
      values.push(`%${category}%`);
    }

    // ค้นหาข้อมูลในฐานข้อมูล
    const results = await connectionPool.query(query, values);
    return res.status(200).json({ data: results.rows });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch a question.",
    });
  }
});

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
    //ลบคำถาม
    const query = `
    delete from questions where id = $1
    `;
    const values = [questionIdFromClient];
    const result = await connectionPool.query(query, values);

    //เช็คการลบคำถาม
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

//Answers
// API answer CREATE - Answer a question
questionsRouter.post(
  "/:id/answers",
  [validateAnswerContent],
  async (req, res) => {
    const questionIdFromClient = req.params.id;
    const { content } = req.body;

    try {
      // ตรวจสอบว่ามีคำถามที่ต้องการตอบหรือไม่
      const questionExists = await connectionPool.query(
        "SELECT 1 FROM questions WHERE id = $1",
        [questionIdFromClient]
      );
      // เช็คหลังจากการตรวจสอบว่ามีข้อมูลหรือไม่ (ถ้าไม่มี หรือ = 0) > จะคืนค่า error พร้อมกับ status 404
      if (questionExists.rowCount === 0) {
        return res.status(404).json({
          message: `Question not found (question id: ${questionIdFromClient})`,
        });
      }

      // เพิ่มคำตอบลงในตาราง answers
      const result = await connectionPool.query(
        `INSERT INTO answers (question_id, content) VALUES ($1, $2) RETURNING id`,
        [questionIdFromClient, content]
      );

      const answerId = result.rows[0].id;

      return res.status(201).json({
        message: `Answer id: ${answerId} created successfully.`,
      });
    } catch (e) {
      return res.status(500).json({
        message: `Unable to create answer. ${e}`,
      });
    }
  }
);

// API answers READ ID - Get answers for a specific question
questionsRouter.get("/:id/answers", async (req, res) => {
  const questionIdFromClient = req.params.id;

  try {
    // ดึงข้อมูลคำตอบทั้งหมดของคำถามที่มี question_id ตรงกับที่ส่งมา
    const results = await connectionPool.query(
      "SELECT * FROM answers WHERE question_id = $1",
      [questionIdFromClient]
    );

    // ตรวจสอบว่ามีคำตอบสำหรับคำถามนี้หรือไม่
    if (results.rowCount === 0) {
      return res.status(404).json({
        message: `No answers found for question id: ${questionIdFromClient}`,
      });
    }

    return res.status(200).json({
      data: results.rows,
    });
  } catch (e) {
    return res.status(500).json({
      message: `Unable to fetch answers. Error: ${e.message}`,
    });
  }
});

// API Question Vote
questionsRouter.post(
  "/:questionId/vote",
  [validateVoteData],
  async (req, res) => {
    const questionId = req.params.questionId;
    const { vote } = req.body;

    try {
      // ตรวจสอบว่ามีคำถามที่ตรงกับ questionId ที่ได้รับมาหรือไม่
      const questionExists = await connectionPool.query(
        "SELECT id FROM questions WHERE id = $1",
        [questionId]
      );

      if (questionExists.rowCount === 0) {
        return res.status(404).json({
          message: `Question not found with id: ${questionId}`,
        });
      }

      // บันทึกผลการโหวตลงในตาราง Question_votes
      const result = await connectionPool.query(
        `
        INSERT INTO question_votes (question_id, vote)
        VALUES ($1, $2) RETURNING id
      `,
        [questionId, vote]
      );

      return res.status(201).json({
        message: `Vote registered successfully with id: ${questionId}`,
      });
    } catch (e) {
      return res.status(500).json({
        message: `Unable to register vote. Error: ${e.message}`,
      });
    }
  }
);

// API สำหรับโหวตคำตอบ
questionsRouter.post(
  "/:answerId/vote",
  [validateVoteData],
  async (req, res) => {
    const answerId = req.params.answerId;
    const { vote } = req.body;

    try {
      // ตรวจสอบว่ามีคำตอบที่ตรงกับ answerId ที่ได้รับมาหรือไม่
      const answerExists = await connectionPool.query(
        "SELECT id FROM answers WHERE id = $1",
        [answerId]
      );

      if (answerExists.rowCount === 0) {
        return res.status(404).json({
          message: `Answer not found with id: ${answerId}`,
        });
      }

      // บันทึกผลการโหวตลงในตาราง answer_votes
      const result = await connectionPool.query(
        `INSERT INTO answer_votes (answer_id, vote)
   VALUES ($1, $2) RETURNING id`,
        [answerId, vote]
      );

      return res.status(201).json({
        message: `Vote registered successfully with id: ${result.rows[0].id}`,
      });
    } catch (e) {
      return res.status(500).json({
        message: `Unable to register vote. Error: ${e.message}`,
      });
    }
  }
);

export default questionsRouter;
