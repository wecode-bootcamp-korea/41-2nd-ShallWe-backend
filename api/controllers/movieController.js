const movieService = require("../services/movieService");
const { asyncErrorHandler, throwCustomError } = require("../middlewares/error");

const movieDetails = asyncErrorHandler(async (request, response) => {
  const { movieId } = request.params;
  if (!movieId) throwCustomError("Unknown Error in detailpage", 400);
  const movie = await movieService.movieDetails(movieId);
  return response.status(200).json({ data: movie });
});

module.exports = { movieDetails };
