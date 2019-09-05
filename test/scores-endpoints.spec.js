const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("Scores endpoints", function() {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.DB_URL
      // connection: process.env.TEST_DB_URL
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  // before("cleanup", () => helpers.cleanTables(db));

  // afterEach("cleanup", () => helpers.cleanTables(db));

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

  it("POST /api/scores/:machine_id respond with 201 and the new score for that machine", () => {
    const machine_id = 1;
    const pinball_user_id = 1;
    const score_value = 23424;
    return (
      supertest(app)
        .post(
          `/api/scores/machine/1?machine_id=${machine_id}&pinballer_user_id=${pinball_user_id}&score_value=${score_value}`
        )
        //commented out below because score_date doesn't understnad the now() function
        // .expect(201,
        //   {
        //   score_id: 18,
        //   score_value: 23424,
        //   pinballer_user_id: 1,
        //   machine_id: 1,
        //   score_date: now()
        // }
        // );
        .expect(201)
    );
  });

  it("GET /api/scores/user/:pinbballer_user_id responds with 200 and a list of scores for that user", () => {
    return supertest(app)
      .get(`/api/scores/user/2`)
      .expect(200, 
        [
          {
              "pinballer_user_id": 2,
              "user_nick_name": "Matty Bombatty",
              "score_value": 162527380,
              "machine_id": 1,
              "machine_name": "Mars Attacks!"
          },
          {
              "pinballer_user_id": 2,
              "user_nick_name": "Matty Bombatty",
              "score_value": 16527380,
              "machine_id": 3,
              "machine_name": "Medieval Madness"
          }
      ] );
  });
});
