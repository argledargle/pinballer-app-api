const express = require("express");
const ScoresService = require("./scores-service");
// const { requireAuth } = require("../middleware/jwt-auth");

const scoresRouter = express.Router();

scoresRouter.route("/:location_id").get((req, res, next) => {
  ScoresService.getScoresForMachine(req.app.get("db"), req.params.location_id)
    .then(scores => {
      res.json(scores);
    })
    .catch(next);
});

module.exports = scoresRouter;
