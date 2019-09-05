const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("Scores endpoints", function() {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.DB_URL
      //   connection: process.env.TEST_DB_URL
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  //   before("cleanup", () => helpers.cleanTables(db));

  //   afterEach("cleanup", () => helpers.cleanTables(db));

  const testLocations = [
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

  const testMachines = [
    {
      machine_id: 1,
      machine_name: "Mars Attacks!",
      location_id: testLocations[0].location_id
    },
    {
      machine_id: 2,
      machine_name: "Pinball",
      location_id: testLocations[1].location_id
    },
    {
      machine_id: 3,
      machine_name: "Metallica",
      location_id: testLocations[2].location_id
    },
    {
      machine_id: 4,
      machine_name: "Medieval Madness",
      location_id: testLocations[2].location_id
    }
  ];

  it("GET /api/machines/name/?machine_name=Metallica responds with 200 and the machine_id, machine_name and machine_location for that machine", () => {
    before("seed location table", () => {
      return db.into("pinballer_locations").insert(testLocations);
      // helpers
      // .seedLocations(db, testLocations)
      // .then(() => helpers.seedMachines(db, testMachines));
    });
    before("seed machines table", () => {
      return db.into("pinballer_machines").insert(testMachines);
    });
    return supertest(app)
      .get("/api/machines/name/?machine_name=Metallica")
      .expect(200, {
        machine_id: 2,
        machine_name: "Metallica",
        location_id: 2
      });
  });

  it(`POST /api/machines/new?machine_name=something and responds with 200`, () => {
    return supertest(app)
      .post(`/api/machines/new?machine_name=something`)
      .expect(200);
  });
});
