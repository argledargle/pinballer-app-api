const knex = require("knex");
const bcrypt = require("bcryptjs");
const app = require("../src/app");
const helpers = require("./test-helpers.js");

describe.only("Users endpoints", function() {
    let db;

    const { testUsers } = helpers.makePinballFixtures()
    const testUser = testUsers[0]

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

      describe(`POST /api/users`, () => {
          context('User Validation', () => {
            beforeEach("insert users", () => helpers.seedUsers(db, testUsers))
          })
      }
      









}) //bottom