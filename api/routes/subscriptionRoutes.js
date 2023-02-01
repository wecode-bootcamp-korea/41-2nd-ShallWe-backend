const express = require("express");
const validateToken = require("../middlewares/auth");
const subscriptionController = require("../controllers/subscriptionController");

const router = express.Router();

router.get("/", validateToken, subscriptionController.getSubscriptions);

module.exports = { router };
