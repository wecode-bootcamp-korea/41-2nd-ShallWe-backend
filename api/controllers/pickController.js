const pickService = require("../services/pickService");
const { asyncErrorHandler, customError } = require("../middlewares/error");

const getPick = asyncErrorHandler(async (request, response) => {
  const userId = request.userId;
  if (!userId) throw customError("GETTING PICK ERROR", 400);
  const results = await pickService.getPick(userId);
  return response.status(200).json({ data: results });
});

module.exports = {
  getPick,
};
