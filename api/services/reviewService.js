const reviewDao = require("../models/reviewDao");
const orderDao = require("../models/orderDao");
const { customError } = require("../middlewares/error");

const getReviews = async (userId) => {
  const reviews = await orderDao.getOrders(userId);
  return reviews;
};

const updateReviews = async (userId, reviewId, content, imagesUrl) => {
  const check = await reviewDao.check(userId, reviewId);
  if (!check) throw customError("Not your reviews", 400);
  return await reviewDao.updateReviews(reviewId, content, imagesUrl);
};

const deleteReviews = async (userId, reviewId) => {
  const check = await reviewDao.check(userId, reviewId);
  if (!check) throw customError("Not your reviews", 400);
  return reviewDao.deleteReviews(userId, reviewId);
};
const createReviews = async (userId, movieId, content, imagesUrl) => {
  return await reviewDao.createReviews(userId, movieId, content, imagesUrl);
};

module.exports = {
  getReviews,
  updateReviews,
  deleteReviews,
  createReviews,
};
