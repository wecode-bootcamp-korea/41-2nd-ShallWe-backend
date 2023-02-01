const userService = require("../services/userService");
const { asyncErrorHandler, customError } = require("../middlewares/error");

// 1. 회원가입
const signUp = asyncErrorHandler(async (req, res) => {
  const { email, password, nickName, profileImage } = req.body;

  if (!email || !password || !nickName || !profileImage)
    throw customError("KEY_ERROR", 400);

  await userService.signUp(email, password, nickName, profileImage);
  res.status(201).json({ message: "SIGNUP_SUCCESS " });
});

// 2. 로그인
const login = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) throw customError("KEY_ERROR", 400);

  jwtToken = await userService.login(email, password);
  return res.status(200).json({ accessToken: jwtToken });
});

// 3. 카카오 로그인
const kakaoLogin = asyncErrorHandler(async (req, res) => {
  const kakaoCode = req.headers.authorization;

  const accessToken = await userService.kakaoLogin(kakaoCode);

  return res.status(200).json({ accessToken: accessToken.jwtToken });
});

// 4. 사용자 정보 리턴 BE => FE
const getUserInfo = asyncErrorHandler(async (req, res) => {
  const userId = req.userId;
  if (!userId) throw customError("GETTING USERS ERROR", 400);
  const results = await userService.getUserInfo(userId);

  return res.status(200).json({ data: results });
});

module.exports = {
  signUp,
  login,
  kakaoLogin,
  getUserInfo,
};
