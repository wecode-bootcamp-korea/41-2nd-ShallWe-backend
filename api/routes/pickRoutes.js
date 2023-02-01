const express = require("express");
const validateToken = require("../middlewares/auth");
const pickController = require("../controllers/pickController");

const router = express.Router();

router.get("", validateToken, pickController.getPick);

module.exports = { router };
