const express = require("express");
const validateToken = require("../middlewares/auth");
const reviewController = require("../controllers/reviewController");

const router = express.Router();

router.get("", validateToken, reviewController.getReviews);
router.post("", validateToken, reviewController.createReviews);
router.patch("", validateToken, reviewController.updateReviews);
router.delete("", validateToken, reviewController.deleteReviews);

module.exports = { router };
