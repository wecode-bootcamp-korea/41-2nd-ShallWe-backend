const express = require("express");
const validateToken = require("../middlewares/auth");
const orderController = require("../controllers/orderController");

const router = express.Router();

router.get("", validateToken, orderController.getOrders);
router.post("/pick", validateToken, orderController.pickPostOrders);
router.get("/pick", orderController.pickGetOrders);
router.post(
  "/subscription",
  validateToken,
  orderController.subscriptionPostOrders
);
router.get("/subscription", orderController.subscriptionGetOrders);
router.get("/fail", orderController.fail);
router.get("/cancel", orderController.cancel);

module.exports = { router };
