const express = require("express");
// const path = require("path");
const MachinesService = require("./machines-service");

const machinesRouter = express.Router();
const jsonBodyParser = express.json();

machinesRouter
  .route("/name/")
  .all(checkMachineExists)
  .get((req, res, next) => {
    MachinesService.getMachine(req.app.get("db"), req.query.machine_name)
      .then(machine => {
        res.json(machine);
      })
      .catch(next);
  });

machinesRouter
  .route("/new/")
  .all(checkMachineNotExist)
  .post(jsonBodyParser, (req, res, next) => {
    
    // if (req.query.location_id === null) {
    //   req.query.location_id = 0;
    // }
    // console.log("location_id", req.query.location_id);

    const { machine_name, location_id } = req.query;

    const newMachine = {
      machine_name,
      location_id
    };

    MachinesService.postMachine(req.app.get("db"), newMachine)
      .then(machine => {
        res.json(machine);
      })
      .catch(next);
  });

async function checkMachineNotExist(req, res, next) {
  try {
    const machine = await MachinesService.checkMachineExits(
      req.app.get("db"),
      req.query.machine_name
    );

    if (machine)
      return res.status(400).json({
        error: `machine exists`
      });

    res.machine = machine;
    next();
  } catch (error) {
    next(error);
  }
}

async function checkMachineExists(req, res, next) {
  try {
    const machine = await MachinesService.checkMachineExits(
      req.app.get("db"),
      req.query.machine_name
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
