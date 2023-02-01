const { myDataSource } = require("./myDataSource");

const createUser = async (email, hashedPassword, nickName, profileImage) => {
  try {
    return await myDataSource.query(
      `INSERT INTO users(
        email,
        password,
        nickname,
        profile_image
      ) VALUES (?, ?, ?, ?);
      `, [ email, hashedPassword, nickName, profileImage]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const getUserData = async (email) => {
  try {
    const userData = await myDataSource.query(
      `SELECT 
        password AS hashedPassword,
        id AS userId
        FROM users"
        WHERE email = ?;
      `, [email]
    );
    return userData;
  } catch (err) {
    const error = new Error("GET_USER_DATA_FAILED");
    error.statusCode = 400;
    throw error;
  }
};

const createKakaoUser = async (email, name, profileImage) => {
  try {
    const result = await myDataSource.query(
      `INSERT INTO users(
        email,
        nickname,
        profile_image
        ) VALUES (?, ?, ?)
        `, [name, email, profileImage]
        );
        return result;
      } catch (err) {
        const error = new Error("INVALID");
         error.statusCode = 400;
         throw error;
      }
};

const getKakaoUserData = async (email) => {
  try {
    const kakaoUserData = await myDataSource.query(
      `SELECT
        name AS kakaoName,
        id AS kakaoUserId
        FROM users
        WHERE email = ?;
      `, [ email ]
    );
    return kakaoUserData;
  } catch (err) {
    const error = new Error("GET_KAKAO_USER_DATA_FAILED");
    error.statusCode = 400;
    throw error;
  }
};

const getUserInfo = async (userId) => {
  try {
    return await myDataSource.query(
      `SELECT
        email,
        password,
        nickname,
        profile_image
        FROM users
        WHERE id = ?;
      `, [userId]
    );
  } catch (err) {
    const error = new Error("GET_USER_INFO_FAILED");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createUser,
  getUserData,
  createKakaoUser,
  getKakaoUserData,
  getUserInfo,
};