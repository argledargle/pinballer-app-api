require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const usersRouter = require("./users/users-router");
const locationsRouter = require("./locations/locations-router");
const scoresRouter = require("./scores/scores-router");
const authRouter = require("./auth/auth-router");
const machinesRouter = require("./machines/machines-router");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));

app.use(cors());
app.use(helmet());

app.use("/api/machines", machinesRouter);
app.use("/api/locations", locationsRouter);
app.use("/api/scores", scoresRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);


app.get("/api/*", (req, res) => {
  res.json({ ok: true });
});

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { message: error.message, error };
    // response = { error: { message: "aaa" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
