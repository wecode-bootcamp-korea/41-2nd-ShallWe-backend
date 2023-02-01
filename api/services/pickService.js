const pickDao = require("../models/pickDao");

const getPick = async (userId) => {
  return await pickDao.getPick(userId);
};

module.exports = {
  getPick,
};
