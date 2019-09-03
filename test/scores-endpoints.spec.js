const knex = require("knex");
const bcrypt = require("bcryptjs");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe.only("Scores endpoints", function() {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));
  // beforeEach("seed all tables", () => {
  //   // console.log(
  //   //   helpers.seedAllTables(
  //   //     // db,
  //   //     // testUsers,
  //   //     // testLocations,
  //   //     // testMachines,
  //   //     // testScores
  //   //   )
  //   // );
  //   return helpers.seedAllTables(
  //     db,
  //     testUsers,
  //     testLocations,
  //     testMachines,
  //     testScores
  //   );
  // });

  it("GET /api/scores/machine/:machine_id responds with 200 and the top 3 scores for that machine", () => {
    return supertest(app)
      .get("/api/scores/machine/1")
      .expect(200);
  });

  it("GET /api/scores/:machine_id responds with 404 and `machine does not exist` if machine does not exist", () => {
    const fakeMachineId = 1234567890;
    return supertest(app)
      .get(`/api/scores/machine/${fakeMachineId}`)
      .expect(404, { error: `machine does not exist` });
  });

  it(
    "POST /api/scores/:machine_id respond with 200 and the new score for that machine"
  ),
    () => {
      const newScore = {
        user_nick_name: "argledargle",
        machine_name: "Mars Attacks!",
        score_value: 30402034
      };
      return supertest(app)
        .post("/api/scores/machine/1")
        .send(newScore)
        .expect(200, {
          user_nick_name: "argledargle",
          machine_name: "Mars Attacks!",
          score_value: 30402034
        });
    };
});
