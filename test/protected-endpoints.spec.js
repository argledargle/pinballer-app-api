const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("Locations Endpoints", function() {
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

  beforeEach("seed", () =>
    helpers.seedAllTables(
      db,
      testUsers,
      testLocations,
      testMachines,
      testScores
    )
  );

  //THERE ARE ONLY A FEW PROTECTED ENDPOINTS:
  //POST scores (any user can do this)
  //admin edit/remove player profiles
  //admin edit/remove locations
});
