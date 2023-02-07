const express = require("express");

const movieController = require("../controllers/movieController");

const router = express.Router();

router.get("/detail/:movieId", movieController.movieDetails);

router.get("/category", movieController.getMovieCategory);

module.exports = { router };
