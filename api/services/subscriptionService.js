const subscriptionDao = require("../models/subscriptionDao");

const getSubscriptions = async (userId) => {
  return await subscriptionDao.getSubscriptions(userId);
};

module.exports = {
  getSubscriptions,
};
