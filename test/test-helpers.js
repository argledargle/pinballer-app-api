const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function makeUsersArray() {
  return [
    {
      user_id: 1,
      user_first_name: "Alex",
      user_last_name: "Peter",
      user_nick_name: "Argledargle",
      password: "Password1",
      user_email: "noreply@gmail.com"
    },
    {
      user_id: 2,
      user_first_name: "Georgia",
      user_last_name: "Rockwell",
      user_nick_name: "Geo",
      password: "Password2",
      user_email: "noreply@ge.com"
    },
    {
      user_id: 3,
      user_first_name: "Matt",
      user_last_name: "Schaladawieler",
      user_nick_name: "Matty Bombatty",
      password: "Password3",
      user_email: "noreply@nissan.com"
    },
    {
      user_id: 4,
      user_first_name: "Nina",
      user_last_name: "Morales",
      user_nick_name: "La Nina",
      password: "Password4",
      user_email: "noreply@wisc.gov"
    }
  ];
}

function makeLocationsArray() {
  return [
    {
      location_name: "Up Down",
      location_address: "615 E Brady St, Milwaukee, WI 53202",
      location_id: 1
    },
    {
      location_name: "Art Bar",
      location_address: "722 E Burleigh St, Milwaukee, WI 53212",
      location_id: 2
    },
    {
      location_name: "The Uptowner",
      location_address: "1032 E Center St, Milwaukee, WI 53212",
      location_id: 3
    }
  ];
}

function makeMachinesArray(testUsers, testLocations) {
  return [
    {
      machine_id: testUsers[0].user_id,
      machine_name: "Mars Attacks!",
      location_id: testLocations[0].location_id
    },
    {
      machine_id: testUsers[1].user_id,
      machine_name: "Pinball",
      location_id: testLocations[1].location_id
    },
    {
      machine_id: testUsers[2].user_id,
      machine_name: "Metallica",
      location_id: testLocations[2].location_id
    },
    {
      machine_id: testUsers[3].user_id,
      machine_name: "Medieval Madness",
      location_id: testLocations[3].location_id
    }
  ];
}

function makeScoresArray(testUsers, testMachines) {
  return [
    {
      score_id: 11,
      score_value: 2045640,
      user_id: testUsers[0].user_id,
      machine_id: testMachines[0].machine_id,
      score_date: "2019-04-15 00:00:00"
    },
    {
      score_id: 12,
      score_value: 3004564,
      user_id: testUsers[1].user_id,
      machine_id: testMachines[1].machine_id,
      score_date: "2019-03-14 00:00:00"
    },
    {
      score_id: 13,
      score_value: 5045640,
      user_id: testUsers[2].user_id,
      machine_id: testMachines[2].machine_id,
      score_date: "2019-04-15 00:00:00"
    },
    {
      score_id: 14,
      score_value: 45445654,
      user_id: testUsers[3].user_id,
      machine_id: testMachines[3].machine_id,
      score_date: "2019-04-15 00:00:00"
    }
  ];
}

function seedUsers(db, testUsers) {
  const preppedUsers = testUsers.map(user => ({
    ...user
    // password: bcrypt.hashSync(user.password, 1)
    //I will need to undo this to account for hashed passwords
  }));
  return db
    .into("pinball_users")
    .insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(`SELECT setval('pinball_users_id_seq', ?)`, [
        testUsers[testUsers.length - 1].id
      ])
    );
}

function seedLocations(db, testUsers = []) {
  return db.into("pinball_users").insert(testUsers);
}

function makePinballFixtures() {
  const testUsers = makeUsersArray();
  const testLocations = makeLocationsArray();
  const testMachines = makeMachinesArray(testUsers, testLocations);
  const testScores = makeScoresArray(testUsers, testMachines);
  return { testUsers, testLocations, testMachines, testScores };
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE 
      pinballer_locations, 
      pinballer_machines, 
      pinballer_users, 
      pinballer_scores
      RESTART IDENTITY CASCADE;`
  );
}

module.exports = {
  makeUsersArray,
  makeLocationsArray,
  makeMachinesArray,
  makeScoresArray,
  makePinballFixtures,
  cleanTables,
  seedUsers
};
