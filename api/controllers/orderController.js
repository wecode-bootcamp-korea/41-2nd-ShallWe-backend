const orderService = require("../services/orderService");
const { asyncErrorHandler, customError } = require("../middlewares/error");

const getOrders = asyncErrorHandler(async (request, response) => {
  const userId = request.userId;
  if (!userId) throw customError("GETTING ORDERS ERROR", 400);
  const results = await orderService.getOrders(userId);

  return response.status(200).json({ data: results });
});

module.exports = {
  getOrders,
};
