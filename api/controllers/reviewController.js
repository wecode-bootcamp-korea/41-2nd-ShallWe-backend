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
  const { movieId, content, imagesUrl, reviewKey } = request.body;

  if (
    !userId ||
    !movieId ||
    !content ||
    !Array.isArray(imagesUrl) ||
    !reviewKey
  )
    throw customError("CREATING REVIEWS ERROR", 400);

  await reviewService.createReviews(
    userId,
    movieId,
    content,
    imagesUrl,
    reviewKey
  );

  return response.status(201).json({ message: "Review Created!" });
});

const updateReviews = asyncErrorHandler(async (request, response) => {
  const userId = request.userId;
  const { content, imagesUrl, reviewKey } = request.body;

  if (!userId || !reviewKey || !content || !Array.isArray(imagesUrl))
    throw customError("UPDATE REVIEWS ERROR", 400);

  await reviewService.updateReviews(userId, reviewKey, content, imagesUrl);

  return response.status(200).json({ message: "Updated review" });
});

const deleteReviews = asyncErrorHandler(async (request, response) => {
  const userId = request.userId;
  const { reviewKey } = request.body;

  if (!userId || !reviewKey) throw customError("DELETE REVIEWS ERROR", 400);

  await reviewService.deleteReviews(userId, reviewKey);

  return response.status(200).json({ message: "Delete review" });
});

module.exports = {
  getReviews,
  createReviews,
  updateReviews,
  deleteReviews,
};
