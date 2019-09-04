const express = require("express");
const ScoresService = require("./scores-service");
// const { requireAuth } = require("../middleware/jwt-auth");

const scoresRouter = express.Router();

scoresRouter
  .route("/machine/:machine_id")
  .all(checkMachineExists)
  .get((req, res, next) => {
    ScoresService.getScoresForMachine(req.app.get("db"), req.params.machine_id)
      .then(scores => {
        res.json(scores);
      })
      .catch(next);
  })
  //post machine/:machine_id should allow a user to post a new score using the body
  //of the req object
  .post((req, res, next) => {
    const { machine_id, pinballer_user_id, score_value } = req.query;
    const newScore = { machine_id, pinballer_user_id, score_value };

    for (const [key, value] of Object.entries(newScore)) {
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        });
    }

    ScoresService.postScore(req.app.get("db"), newScore)
      .then(scores => {
        res.status(201).json(scores);
      })
      .catch(next);
  })

  //this code below here should get the highest score for a user an all
  //machines they have scores on
  scoresRouter
  .route("/user/:pinballer_user_id")
  .get((req, res, next) => {
    ScoresService.getScoresForPlayer(req.app.get("db"), req.params.pinballer_user_id)
    .then(scores => {
      res.json(scores);
    })
    .catch(next)
  });

async function checkMachineExists(req, res, next) {
  try {
    const machine = await ScoresService.checkMachineExits(
      req.app.get("db"),
      req.params.machine_id
    );

    if (!machine)
      return res.status(404).json({
        error: `machine does not exist`
      });

    res.machine = machine;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = scoresRouter;
