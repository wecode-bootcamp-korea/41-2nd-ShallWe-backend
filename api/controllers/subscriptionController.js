const subscriptionService = require("../services/subscriptionService");
const { asyncErrorHandler, customError } = require("../middlewares/error");

const getSubscriptions = asyncErrorHandler(async (request, response) => {
  const userId = request.userId;
  if (!userId) throw customError("GETTING SUBSCRIPTIONS ERROR", 400);
  const results = await subscriptionService.getSubscriptions(userId);

  return response.status(200).json({ data: results });
});

module.exports = { getSubscriptions };
