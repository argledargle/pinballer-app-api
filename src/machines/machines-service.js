const MachinesService = {
  getMachine(db, machine_name) {
    return db
      .from("pinballer_machines")
      .where("pinballer_machines.machine_name", machine_name)
      .first();
  },

  checkMachineExits(db, machine_name) {
    return db
      .from("pinballer_machines")
      .where("pinballer_machines.machine_name", machine_name)
      .first();
  }
};

module.exports = MachinesService;
