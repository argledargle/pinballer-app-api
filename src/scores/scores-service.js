const ScoresService = {
  // getScoresForMachine should search via
  // location_id to display top 3 scores for that machine

  getScoresForMachine(db, machine_id) {
    return db
      .select("*")
      .from("pinballer_scores AS scores")
      .where("machine_id", machine_id)
      .leftJoin(
        "pinballer_machines AS machines",
        "machines.machine_id",
        "scores.machine_id"
      );
  }
};

module.exports = ScoresService;
