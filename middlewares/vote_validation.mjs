export const validateVoteData = (req, res, next) => {
  const { vote } = req.body;

  if (vote !== 1 && vote !== -1) {
    return res.status(400).json({
      message: "Invalid vote value. Vote must be 1 or -1.",
    });
  }

  next();
};
