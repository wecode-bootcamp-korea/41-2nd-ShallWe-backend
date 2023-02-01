const refundDao = require("../models/refundDao");

const getRefunds = async (userId) => {
  return await refundDao.getRefunds(userId);
};

module.exports = {
  getRefunds,
};
