const LocationsService = require("../src/locations/locations-service");
const knex = require("knex");

describe.only(`Articles service object`, function() {
  let db;

  let testLocations = [
    {
      location_id: 21,
      location_address: "2800 N. Booth St.",
      location_name: "Around the corner"
    },
    {
      location_id: 22,
      location_address: "615 E Brady St, Milwaukee, WI 53202",
      location_name: "Up Down"
    },
    {
      location_id: 32,
      location_address: "722 E Burleigh St, Milwaukee, WI 53212",
      location_name: "Art Bar"
    },
    {
      location_id: 42,
      location_address: "1032 E Center St, Milwaukee, WI 53212",
      location_name: "The Uptowner"
    }
  ];

  before(() => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL
    });
  });

  before(() => {
    return db.into("pinballer_locations").insert(testLocations);
  });

  after(() => db.destroy());

  before(() => db('pinballer_locations').truncate())

  describe.only(`getAllLocations()`, () => {
    it(`resolves all locations from 'pinballer_locations' table`, () => {
      // test that ArticlesService.getAllArticles gets data from table
      return LocationsService.getAllLocations(db).then(actual => {
        expect(actual).to.eql(testLocations);
      });
    });
  });
});

// const knex = require("knex");
// const bcrypt = require("bcryptjs");
// const app = require("../src/app");
// const helpers = require("./test-helpers");

// describe.only("Locations Endpoints", function() {
//   let db;

//   before("make knex instance", () => {
//     db = knex({
//       client: "pg",
//       connection: process.env.TEST_DB_URL
//     });
//     app.set("db", db);
//   });

//   after("disconnect from db", () => db.destroy());

//   before("cleanup", () => helpers.cleanTables(db));

//   afterEach("cleanup", () => helpers.cleanTables(db));

//   testLocations = [
//     {
//       location_id: 11,
//       location_address: "2800 N. Booth St.",
//       location_name: "Around the corner"
//     },
//     {
//       location_id: 12,
//       location_address: "615 E Brady St, Milwaukee, WI 53202",
//       location_name: "Up Down"
//     },
//     {
//       location_id: 13,
//       location_address: "722 E Burleigh St, Milwaukee, WI 53212",
//       location_name: "Art Bar"
//     },
//     {
//       location_id: 14,
//       location_address: "1032 E Center St, Milwaukee, WI 53212",
//       location_name: "The Uptowner"
//     }
//   ];

//   beforeEach("insert locations", () => {
//     return db.into("pinballer_locations").insert(testLocations);
//   });

//   it("GET /locations responds with 200 and all of the locations", () => {
//     return supertest(app)
//       .get("/locations")
//       .expect(200, testLocations);
//   });
// });
