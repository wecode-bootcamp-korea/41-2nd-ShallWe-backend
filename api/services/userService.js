require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userDao = require("../models/userDao");
const axios = require("axios");

const { throwCustomError } = require("../middlewares/error");

const saltRounds = 12;
const secretKey = process.env.SECRET_KEY;

// 1. 회원가입
const signUp = async (email, password, nickName, profileImage) => {
  // 이미 가입된 사용자인지 확인 (메일주소가 DB에 이미 존재하는지 확인)
  const userData = await userDao.getUserData(email);

  if (userData.length) {
    const err = new Error("ALREADY_SIGNED_UP");
    err.statusCode = 409;
    throw err;
  }

  // 비밀번호 검증
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );

  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const createUser = await userDao.createUser(
    email,
    hashedPassword,
    nickName,
    profileImage
  );

  return createUser;
};

// 2. 로그인
const login = async (email, password) => {
  // 가입된 사용자인지 확인
  const userData = await userDao.getUserData(email);

  if (!userData.length) {
    const err = new Error("INVALID_USER");
    err.statusCode = 409;
    throw err;
  }

  const { hashedPassword, userId } = userData[0];

  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );
  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }

  if (!(await bcrypt.compare(password, hashedPassword))) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }

  // JWT 토큰 생성 & 토큰 리턴, 페이로드 값 설정
  const payLoad = { userId: userId };
  const jwtToken = jwt.sign(payLoad, secretKey); // (4)

  return jwtToken;
};

// 3. 카카오 로그인
const kakaoLogin = async (kakaoCode) => {
  // 토큰을 변수 안에 담을 수 있도록 하여야 함 (엑시오스를 이용하여 카카오 주소와 통신 (post = 요청을 보내))
  const kakaoToken = await axios.post(
    "https://kauth.kakao.com/oauth/token",
    {},
    {
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params: {
        grant_type: "authorization_code",
        client_id: "6546c40ecd4c69b80ec8fba5dfdb2766",
        code: `${kakaoCode}`,
        redirect_uri: "http://localhost:3000/auth/kakao/callback",
      },
    }
  );

  // 사용자 정보와 토큰 값 확인
  const result = await axios.post(
    "https://kapi.kakao.com/v2/user/me",
    {},
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: `Bearer ${kakaoToken.data.access_token}`,
      },
    }
  );

  // 회원가입 & 로그인 절차 진행 및 사용자 정보 추출
  const name = result.data.kakao_account.name;
  const email = result.data.kakao_account.email;
  const profileImage = result.data.kakao_account.profile;

  // 카카오 회원가입 확인
  const kakaoUser = async (email) => {
    const [kakaoUserData] = await userDao.getKakaoUserData(email);

    if (!kakaoUserData) {
      const createKakaoUser = await userDao.createKakaoUser(email);
      return { data: createKakaoUser.insertId };
    }

    return { data: kakaoUserData.id };
  };

  // 카카오 유저 JWT 토큰 리턴
  const payLoad = kakaoUser;
  const jwtToken = jwt.sign(payLoad, secretKey);

  return { jwtToken, name, email };
};

// 4. 사용자 정보 리턴
const getUserInfo = async (userId) => {
  const result = await userDao.getUserInfo(userId);
  if (!result.length) return throwCustomError("There are no informations", 400);
  return result;
};

module.exports = {
  signUp,
  login,
  kakaoLogin,
  getUserInfo,
};
