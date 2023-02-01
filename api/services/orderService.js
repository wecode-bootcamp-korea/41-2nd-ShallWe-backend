const orderDao = require("../models/orderDao");

const getOrders = async (userId) => {
  return await orderDao.getOrders(userId);
};

module.exports = {
  getOrders,
};
