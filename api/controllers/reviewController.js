const reviewService = require("../services/reviewService");
const { asyncErrorHandler, customError } = require("../middlewares/error");

const getReviews = asyncErrorHandler(async (request, response) => {
  const userId = request.userId;
  if (!userId) throw customError("GETTING REVIEWS ERROR", 400);
  const results = await reviewService.getReviews(userId);

  return response.status(200).json({ orders: results });
});

const createReviews = asyncErrorHandler(async (request, response) => {
  const userId = request.userId;
  const { movieId, content, imagesUrl } = request.body;

  if (!userId || !movieId || !content || !Array.isArray(imagesUrl))
    throw customError("CREATING REVIEWS ERROR", 400);
  await reviewService.createReviews(userId, movieId, content, imagesUrl);

  return response.status(201).json({ message: "Review Created!" });
});

const updateReviews = asyncErrorHandler(async (request, response) => {
  const userId = request.userId;
  const { reviewId, content, imagesUrl } = request.body;

  if (!userId || !reviewId || !content || !Array.isArray(imagesUrl))
    throw customError("UPDATE REVIEWS ERROR", 400);
  await reviewService.updateReviews(userId, reviewId, content, imagesUrl);

  return response.status(200).json({ message: "Updated review" });
});

const deleteReviews = asyncErrorHandler(async (request, response) => {
  const userId = request.userId;
  const { reviewId } = request.body;
  if (!userId || !reviewId) throw customError("DELETE REVIEWS ERROR", 400);
  await reviewService.deleteReviews(userId, reviewId);

  return response.status(200).json({ message: "Delete review" });
});

module.exports = {
  getReviews,
  createReviews,
  updateReviews,
  deleteReviews,
};
