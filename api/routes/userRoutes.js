const express = require("express");
const validateToken = require("../middlewares/auth");
const userController = require("../controllers/userController");

const router = express.Router();

// 1. 회원가입
router.post("/signup", userController.signUp);

// 2. 로그인
router.post("/login", userController.login);

// 3. 카카오 로그인
router.post("/kakaoLogin", userController.kakaoLogin);

// 4. DB => FE 회원정보 제공
router.get("", validateToken, userController.getUserInfo);

module.exports = { router };
