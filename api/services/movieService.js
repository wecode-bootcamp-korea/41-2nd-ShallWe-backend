const movieDao = require("../models/movieDao");
const { throwCustomError } = require("../middlewares/error");

require("dotenv").config();

const movieDetails = async (movieId) => {
  const result = await movieDao.movieDetails(movieId);
  if (!result.length) throwCustomError("Movie is not found", 404);
  return result;
};

const getMovieCategory = async ( category, page ) => {

  const movieCategory = await movieDao.movieCategory( category, page );
  
  if ( !movieCategory ) {
    const err = new Error("NOT_movieCategory");
    err.statusCode = 404;
    throw err;
  }

  return movieCategory
};

module.exports = {
  movieDetails,
  getMovieCategory,
};
