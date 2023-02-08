const refundService = require("../services/refundService");
const { asyncErrorHandler, customError } = require("../middlewares/error");

const getRefunds = asyncErrorHandler(async (request, response) => {
  const userId = request.userId;
  if (!userId) throw customError("GETTING REFUNDS ERROR", 400);
  const results = await refundService.getRefunds(userId);

  return response.status(200).json({ data: results });
});

const cancelSubscription = asyncErrorHandler(async (request, response) => {
  const userId = request.userId;
  const subscriptionId = request.body.subscriptionId;

  if (!userId || !subscriptionId)
    throw customError("cancel subscription fail", 400);
  const result = await refundService.cancelSubscription(userId, subscriptionId);
  return response.status(200).json({ message: "subscription cancelled" });
});

module.exports = {
  getRefunds,
  cancelSubscription,
};
