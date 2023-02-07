const movieService = require("../services/movieService");
const { asyncErrorHandler, throwCustomError } = require("../middlewares/error");

const movieDetails = asyncErrorHandler(async (request, response) => {
  const { movieId } = request.params;
  if (!movieId) throwCustomError("Unknown Error in detailpage", 400);
  const movie = await movieService.movieDetails(movieId);
  return response.status(200).json({ data: movie });
});

const getMovieCategory = asyncErrorHandler (async (req, res) => {
  const { category, page } = req.query;
  try {
    const movieCategory = await movieService.getMovieCategory(
      category,
      page,
      )

    return res.status(200).json(movieCategory);
  } catch (error) {
    console.log(error);
    error.statusCode = 500;
    throw error;
  }
});

 module.exports = {
  movieDetails,
  getMovieCategory,
};
