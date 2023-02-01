const { throwCustomError } = require("../middlewares/error");
const pickDao = require("../models/pickDao");

const getPick = async (userId) => {
  return await pickDao.getPick(userId);
};

const postPick = async (userId, id, counts, price) => {
  return await pickDao.postPick(userId, id, counts, price);
};

const updatePick = async (userId, id, counts, price) => {
  const check = await pickDao.checkPick(userId, id);
  if (!check.length) return throwCustomError("THERE IS NO INFORMATIONS", 400);
  return await pickDao.updatePick(userId, id, counts, price);
};

const deletePick = async (userId, id) => {
  const check = await pickDao.checkPick(userId, id);
  if (!check.length) return throwCustomError("THERE IS NO INFORMATIONS", 400);
  return await pickDao.deletePick(userId, id);
};

module.exports = {
  getPick,
  postPick,
  updatePick,
  deletePick,
};
