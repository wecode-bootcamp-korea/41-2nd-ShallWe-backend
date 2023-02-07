require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./api/routes");

const { errorHandler } = require("./api/middlewares/error");
const subscription = require("./api/utils/subscription");

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan("combined"));

  app.use(routes);
  app.use(errorHandler);

  app.get("/ping", (request, response) => {
    response.status(200).send("pong");
  });

  subscription();

  return app;
};

module.exports = { createApp };
