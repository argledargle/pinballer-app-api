const knex = require("knex");
const bcrypt = require("bcryptjs");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("Scores endpoints", function() {
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

  it("GET /api/scores/:machine_id responds with 200 and the top 3 scores for that machine", () => {
    before("seed all tables", () =>
      helpers.seedAllTables(
        db,
        testUsers,
        testLocations,
        testMachines,
        testScores
      )
    );
    return supertest(app)
      .get("/api/scores/machine/1")
      .expect(200);
  });
  it("GET api/scores/:machine_id responds with 404 and `machine does not exist` if machine does not exist", () => {
    const machineId = 1234567890;
    return supertest(app)
      .get(`/api/scores/machine/${machineId}`)
      .expect(404, { error: `machine does not exist` });
  });
});