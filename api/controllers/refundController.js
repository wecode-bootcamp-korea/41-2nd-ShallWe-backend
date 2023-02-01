const refundService = require("../services/refundService");
const { asyncErrorHandler, throwCustomError } = require("../middlewares/error");

const getRefunds = asyncErrorHandler(async (request, response) => {
  const userId = request.userId;
  if (!userId) throwCustomError("GETTING REFUNDS ERROR", 400);
  const results = await refundService.getRefunds(userId);
  return response.status(200).json({ data: results });
});

module.exports = {
  getRefunds,
};
