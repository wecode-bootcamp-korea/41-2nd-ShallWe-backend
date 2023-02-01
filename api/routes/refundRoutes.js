const express = require("express");
const validateToken = require("../middlewares/auth");
const refundController = require("../controllers/refundController");

const router = express.Router();

router.get("", validateToken, refundController.getRefunds);

module.exports = { router };
