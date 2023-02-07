const orderDao = require("../models/orderDao");

const getOrders = async (userId) => {
  return await orderDao.getOrders(userId);
};

const completeOrders = async (tid, paymentType, pickId) => {
  const type = Object.freeze({
    MONEY: 2,
    CARD: 3,
  });

  return await orderDao.completeOrders(tid, type[paymentType], pickId);
};

const completeSubscription = async (
  userId,
  tid,
  sid,
  paymentType,
  subscriptionTypeId
) => {
  const type = Object.freeze({
    MONEY: 2,
    CARD: 3,
  });

  return await orderDao.completeSubscription(
    userId,
    tid,
    sid,
    type[paymentType],
    subscriptionTypeId
  );
};

module.exports = {
  getOrders,
  completeOrders,
  completeSubscription,
};
