const asyncErrorHandler = (func) => {
  return async (req, res, next) => {
    await func(req, res).catch((error) => next(error));
  };
};

const errorHandler = (err, request, response, next) => {
  console.log(err);
  return response.status(err.statusCode || 500).json({ message: err.message });
};

const throwCustomError = (message, statusCode) => {
  const err = new Error(message);
  err.statusCode = statusCode;

  throw err;
};

module.exports = {
  errorHandler,
  asyncErrorHandler,
  throwCustomError,
};
