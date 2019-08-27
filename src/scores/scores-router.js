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
