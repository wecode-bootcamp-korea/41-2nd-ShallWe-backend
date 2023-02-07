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
      `,
      [email, hashedPassword, nickName, profileImage]
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
      `,
      [email]
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
        profile_image,
        social_type_id
        ) VALUES (?, ?, ?,1)
        `,
      [email, name, profileImage]
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
        nickname AS kakaoName,
        id
        FROM users
        WHERE email = ?;
      `,
      [email]
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
    const result = myDataSource.query(
      `
    SELECT
     u.id,
     u.nickname,
     u.password,
     u.email,
     u.profile_image,
     JSON_ARRAYAGG(
        JSON_OBJECT(
            "address",ua.address,
            "zip_code",ua.zip_code
            )
            ) AS address
    FROM users                  AS u
    LEFT JOIN user_addresses    AS ua ON ua.user_id =u.id
    WHERE u.id=?
    GROUP BY u.nickname,u.email,u.profile_image;
    `,
      [userId]
    );
    return result;
  } catch (error) {
    const err = new Error("get userinfo fail");
    err.statusCode = 400;
    throw err;
  }
};

module.exports = {
  createUser,
  getUserData,
  createKakaoUser,
  getKakaoUserData,
  getUserInfo,
};
