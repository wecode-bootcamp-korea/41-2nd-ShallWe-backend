const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  try {
    const jsonwebtoken = req.headers.authorization;
    const decode = jwt.verify(jsonwebtoken, process.env.SECRET_KEY);

    req.userId = decode.userId;
    next();
  } catch (err) {
    const error = new Error("Invalid Access Token");
    error.statusCode = 401;
    next(error);
  }
};

module.exports = validateToken;
