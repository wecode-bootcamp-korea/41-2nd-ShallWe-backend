const express = require("express");
const validateToken = require("../middlewares/auth");
const orderController = require("../controllers/orderController");

const router = express.Router();

router.get("", validateToken, orderController.getOrders);

module.exports = { router };
