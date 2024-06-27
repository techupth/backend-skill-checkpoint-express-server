export const validateQuestions = (req, res, next) => {
  if (!req.body.title) {
    return res.status(400).json({
      message: "กรุณาส่งข้อมูล Title!!!",
    });
  }
  if (!req.body.description) {
    return res.status(400).json({
      message: "กรุณาส่งข้อมูล description!!!",
    });
  }
  if (!req.body.category) {
    return res.status(400).json({
      message: "กรุณาส่งข้อมูล Category!!!",
    });
  }

  if (req.body.description.length < 5 || req.body.description.length > 500) {
    return res.status(400).json({
      message: "Description จะต้องมีความยาวอยู่ในระหว่าง 5 - 500 ตัวอักษร",
    });
  }
  next();
};
