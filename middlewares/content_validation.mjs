export const validateAnswerContent = (req, res, next) => {
  const { content } = req.body;

  // ตรวจสอบว่า content ไม่เกิน 300 ตัวอักษร
  if (!content || content.length > 300) {
    return res.status(400).json({
      message:
        "Answer content must be a non-empty string and not exceed 300 characters.",
    });
  }

  next();
};
