const express = require("express");
const router = express.Router();

const userRouter = require("./userRoutes");
const movieRouter = require("./movieRoutes");

const orderRouter = require("./orderRoutes");
const pickRouter = require("./pickRoutes");
const refundRouter = require("./refundRoutes");
const reviewRouter = require("./reviewRoutes");
const subscriptionRouter = require("./subscriptionRoutes");

router.use("/users", userRouter.router);
router.use("/movies", movieRouter.router);
router.use("/myShallWe/userInfo", userRouter.router);
router.use("/myShallWe/orders", orderRouter.router);
router.use("/myShallWe/pick", pickRouter.router);
router.use("/myShallWe/refunds", refundRouter.router);
router.use("/myShallWe/reviews", reviewRouter.router);
router.use("/myShallWe/subscriptions", subscriptionRouter.router);
router.use("/shallWeMovie", movieRouter.router);


module.exports = router;
