const orderDao = require("../models/orderDao");

const getOrders = async (userId) => {
  return await orderDao.getOrders(userId);
};

const completeOrders = async (userId, tid, paymentType, pickId) => {
  const type = Object.freeze({
    MONEY: 2,
    CARD: 3,
  });

  return await orderDao.completeOrders(userId, tid, type[paymentType], pickId);
};

module.exports = {
  getOrders,
  completeOrders,
};
