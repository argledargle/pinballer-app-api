const ScoresService = {
  // getScoresForMachine should search via
  // machine_id to display top 3 scores and users
  // for that machine

  getScoresForMachine(db, machine_id) {
    return db
      .select(
        "pinballer_scores.score_id",
        "pinballer_scores.score_value",
        "pinballer_scores.pinballer_user_id",
        "pinballer_scores.machine_id",
        "pinballer_scores.score_date",
        "pinballer_machines.machine_id",
        "pinballer_machines.machine_name",
        "pinballer_users.user_nick_name",
        "pinballer_users.user_first_name",
        "pinballer_users.user_last_name"
      )
      .from("pinballer_scores")
      .where("pinballer_scores.machine_id", machine_id)
      .leftJoin(
        "pinballer_machines",
        "pinballer_machines.machine_id",
        "pinballer_scores.machine_id"
      )
      .leftJoin(
        "pinballer_users",
        "pinballer_users.pinballer_user_id",
        "pinballer_scores.pinballer_user_id"
      )
      .orderBy("pinballer_scores.score_value", "desc")
      .limit(3);
  },

  checkMachineExits(db, machine_id) {
    return db
      .select("pinballer_machines.machine_id")
      .from("pinballer_machines")
      .where("pinballer_machines.machine_id", machine_id)
      .first();
  },

  postScore(db, newScore) {
    return db
      .insert(newScore)
      .into("pinballer_scores")
      .returning("*");
  },

  getScoresForPlayer(db, pinballer_user_id) {
    return db
      .select(
        "pinballer_users.pinballer_user_id",
        "pinballer_users.user_nick_name",
        "pinballer_scores.pinballer_user_id",
        "pinballer_scores.score_value",
        "pinballer_machines.machine_id",
        "pinballer_machines.machine_name"
      )
      .from("pinballer_users")
      .where("pinballer_users.pinballer_user_id", pinballer_user_id)
      .leftJoin(
        "pinballer_scores",
        "pinballer_scores.pinballer_user_id",
        "pinballer_users.pinballer_user_id"
      )
      .leftJoin(
        "pinballer_machines",
        "pinballer_machines.machine_id",
        "pinballer_scores.machine_id"
      )
      .orderBy(
        "pinballer_machines.machine_id"
      );
  }
};

module.exports = ScoresService;
