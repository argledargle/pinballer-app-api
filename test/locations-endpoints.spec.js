const knex = require("knex");
const bcrypt = require("bcryptjs");
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

  testLocations = [
    {
      location_name: "Art Bar",
      location_address: "722 E Burleigh St, Milwaukee, WI 53212",
      location_id: 2
    },
    {
      location_name: "The Uptowner",
      location_address: "1032 E Center St, Milwaukee, WI 53212",
      location_id: 3
    },
    {
      location_name: "Up Down",
      location_address: "615 E Brady St, Milwaukee, WI 53202",
      location_id: 1
    }
  ];

  beforeEach("insert locations", () => {
    return db.into("pinballer_locations").insert(testLocations);
  });

  it("GET /locations responds with 200 and all of the locations", () => {
    return supertest(app)
      .get("/locations")
      .expect(200, testLocations);
  });
});
