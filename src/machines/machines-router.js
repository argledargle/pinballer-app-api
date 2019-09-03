const express = require("express");
// const path = require("path");
const MachinesService = require("./machines-service");

const machinesRouter = express.Router();
// const jsonBodyParser = express.json();

machinesRouter
  .route("/name/")
  .all(checkMachineExists)
  .get((req, res, next) => {
    MachinesService.getMachine(req.app.get("db"), req.params.machine_name)
      .then(machine => {
        res.json(machine);
      })
      .catch(next);
  });

async function checkMachineExists(req, res, next) {
  try {
    const machine = await MachinesService.checkMachineExits(
      req.app.get("db"),
      req.params.machine_name
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

module.exports = machinesRouter;
