const reviewDao = require("../models/reviewDao");
const orderDao = require("../models/orderDao");
const { customError } = require("../middlewares/error");

const getReviews = async (userId) => {
  const reviews = await new orderDao().getOrders(userId);

  return reviews;
};

const updateReviews = async (userId, reviewKey, content, imagesUrl) => {
  const check = await reviewDao.check(userId, reviewKey);

  if (!check) throw customError("Not your reviews", 400);

  return await reviewDao.updateReviews(reviewKey, content, imagesUrl);
};

const deleteReviews = async (userId, reviewKey) => {
  const check = await reviewDao.check(userId, reviewKey);

  if (!check) throw customError("Not your reviews", 400);

  return reviewDao.deleteReviews(userId, reviewKey);
};

const createReviews = async (
  userId,
  movieId,
  content,
  imagesUrl,
  reviewKey
) => {
  return await reviewDao.createReviews(
    userId,
    movieId,
    content,
    imagesUrl,
    reviewKey
  );
};

module.exports = {
  getReviews,
  updateReviews,
  deleteReviews,
  createReviews,
};
