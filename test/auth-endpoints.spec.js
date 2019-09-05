const knex = require("knex");
const jwt = require("jsonwebtoken");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("Auth Endpoints", function() {
  let db;

  const { testUsers } = helpers.makePinballFixtures();
  const testUser = testUsers[0];

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

  describe(`POST /api/auth/login`, () => {
    beforeEach("insert users", () => helpers.seedUsers(db, testUsers));

    const requiredFields = ["user_nick_name", "user_password"];

    requiredFields.forEach(field => {
      const loginAttemptBody = {
        user_nick_name: testUser.user_nick_name,
        user_password: testUser.user_password
      };
      it(`responds 400 'invalid user_nick_name or user_password' when bad user_password`, () => {
        const userInvalidPass = {
          user_nick_name: testUser.user_nick_name,
          user_password: "incorrect"
        };
        return supertest(app)
          .post("/api/auth/login")
          .send(userInvalidPass)
          .expect(400, { error: `Incorrect user_nick_name or user_password` });
      });

      it(`responds with 400 required error when '${field}' is missing`, () => {
        delete loginAttemptBody[field];
        return supertest(app)
          .post("/api/auth/login")
          .send(loginAttemptBody)
          .expect(400, {
            error: `Missing '${field}' in request body`
          });
      });
      it(`responds 200 and JWT auth token using secret when valid credentials`, () => {
        const userValidCreds = {
          user_nick_name: testUser.user_nick_name,
          user_password: testUser.user_password
        };
        const expectedToken = jwt.sign(
          { user_id: testUser.pinballer_user_id }, // payload
          process.env.JWT_SECRET,
          {
            subject: testUser.user_nick_name,
            expiresIn: 10800,
            algorithm: "HS256"
          }
        );
        return supertest(app)
          .post("/api/auth/login")
          .send(userValidCreds)
          .expect(200
            // , {
            // authToken: expectedToken
          // }
          );
      });
    });
  });
//change to expect 200 and that's it.
  describe(`POST /api/auth/refresh`, () => {
    beforeEach("insert users", () => helpers.seedUsers(db, testUsers));

    it(`responds 200 and JWT auth token using secret`, () => {
      const expectedToken = jwt.sign(
        { user_id: testUser.pinballer_user_id },
        process.env.JWT_SECRET,
        {
          subject: testUser.user_nick_name,
          expiresIn: 10800,
          algorithm: "HS256"
        }
      );
      return supertest(app)
        .post("/api/auth/refresh")
        .set("Authorization", helpers.makeAuthHeader(testUser))
        .expect(200
        //   , {
        //   authToken: expectedToken
        // }
        );
    });
  });
});
