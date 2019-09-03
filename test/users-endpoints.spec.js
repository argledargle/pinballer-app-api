// might need to start from scratch on this one.

const knex = require("knex");
const bcrypt = require("bcryptjs");
const app = require("../src/app");
const helpers = require("./test-helpers.js");

describe("Users endpoints", function() {
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

  describe(`POST /api/users`, () => {
    context("User Validation", () => {
      beforeEach("insert users", () => helpers.seedUsers(db, testUsers));

      const requiredFields = [
        "user_first_name",
        "user_last_name",
        "user_email",
        "user_password",
        "user_nick_name"
      ];
      requiredFields.forEach(field => {
        const registerAttemptBody = {
          user_first_name: "test user_first_name",
          user_last_name: "test user_last_name",
          user_email: "test user_email",
          user_password: "test user_password",
          user_nick_name: "test user_nick_name"
        };

        it(`responds with 400 required error when '${field}' is missing`, () => {
          delete registerAttemptBody[field];

          return supertest(app)
            .post("/api/users")
            .send(registerAttemptBody)
            .expect(400, {
              error: `Missing '${field}' in request body`
            });
        });
      });
    });
    context(`Happy path`, () => {
      it(`responds 201, serialized user, storing bcryped password`, () => {
        const newUser = {
          user_first_name: "test user_first_name",
          user_last_name: "test user_last_name",
          user_email: "test user_email",
          user_password: "test user_password",
          user_nick_name: "test user_nick_name",
        };
        return supertest(app)
          .post("/api/users")
          .send(newUser)
          .expect(201)
          .expect(res => {
            expect(res.body).to.have.property("user_id");
            expect(res.body.user_first_name).to.eql(newUser.user_first_name);
            expect(res.body.user_last_name).to.eql(newUser.user_last_name);
            expect(res.body.user_email).to.eql(newUser.user_email);
            expect(res.body.user_nick_name).to.eql(newUser.user_nick_name);
            expect(res.body).to.not.have.property("user_password");
            expect(res.headers.location).to.eql(`/api/users/${res.body.pinballer_user_id}`);
          })
          .expect(res =>
            db
              .from("pinball_users")
              .select("*")
              .where({ user_id: res.body.user_id })
              .first()
              .then(row => {
                expect(row.user_first_name).to.eql(newUser.user_first_name);
                expect(row.user_last_name).to.eql(newUser.user_last_name);
                expect(row.user_email).to.eql(newUser.user_email);
                expect(row.user_nick_name).to.eql(newUser.user_nick_name);
                return bcrypt.compare(newUser.user_password, row.user_password);
              })
              .then(compareMatch => {
                expect(compareMatch).to.be.true;
              })
          );
      });
    });
  }); //end of `POST /api/users`
}); //end of document
