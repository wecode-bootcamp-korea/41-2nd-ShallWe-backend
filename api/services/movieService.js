const movieDao = require("../models/movieDao");
const { throwCustomError } = require("../middlewares/error");

const movieDetails = async (movieId) => {
  const result = await movieDao.movieDetails(movieId);
  if (!result.length) throwCustomError("Movie is not found", 404);
  return result;
};

module.exports = { movieDetails };
