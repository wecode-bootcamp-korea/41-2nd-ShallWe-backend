const express = require("express");
const router = express.Router();

// 회원가입, 로그인. 시용자 정보 라우터
const userRouter = require("./userRoutes");

const orderRouter = require("./orderRoutes");
const pickRouter = require("./pickRoutes");
const refundRouter = require("./refundRoutes");
const reviewRouter = require("./reviewRoutes");
const subscriptionRouter = require("./subscriptionRoutes");

router.use("/users", userRouter.router);
router.use("/myShallWe/userInfo", userRouter.router);
router.use("/myShallWe/orders", orderRouter.router);
router.use("/myShallWe/pick", pickRouter.router);
router.use("/myShallWe/refunds", refundRouter.router);
router.use("/myShallWe/reviews", reviewRouter.router);
router.use("/myShallWe/subscriptions", subscriptionRouter.router);

module.exports = router;
