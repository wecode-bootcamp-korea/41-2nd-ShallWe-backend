const express = require("express");
const router = express.Router();

// 회원가입, 로그인. 시용자 정보 라우터
const userRouter = require("./userRoutes");

router.use("/users", userRouter.router);

module.exports = router;
