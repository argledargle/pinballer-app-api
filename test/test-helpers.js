const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function makeUsersArray() {
  return [
    {
      pinballer_user_id: 1,
      user_first_name: "Alex",
      user_last_name: "Peter",
      user_nick_name: "Argledargle",
      user_password: "Password1",
      user_email: "noreply@gmail.com"
    },
    {
      pinballer_user_id: 2,
      user_first_name: "Georgia",
      user_last_name: "Rockwell",
      user_nick_name: "Geo",
      user_password: "Password2",
      user_email: "noreply@ge.com"
    },
    {
      pinballer_user_id: 3,
      user_first_name: "Matt",
      user_last_name: "Schaladawieler",
      user_nick_name: "Matty Bombatty",
      user_password: "Password3",
      user_email: "noreply@nissan.com"
    },
    {
      pinballer_user_id: 4,
      user_first_name: "Nina",
      user_last_name: "Morales",
      user_nick_name: "La Nina",
      user_password: "Password4",
      user_email: "noreply@wisc.gov"
    }
  ];
}

function makeLocationsArray() {
  return [
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
}

function makeMachinesArray(testLocations) {
  return [
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
}

function makeScoresArray(testUsers, testMachines) {
  return [
    {
      score_id: 1,
      score_value: 2045640,
      pinballer_user_id: testUsers[0].pinballer_user_id,
      machine_id: testMachines[0].machine_id,
      score_date: "2019-04-15 00:00:00"
    },
    {
      score_id: 2,
      score_value: 3004564,
      pinballer_user_id: testUsers[1].pinballer_user_id,
      machine_id: testMachines[1].machine_id,
      score_date: "2019-03-14 00:00:00"
    },
    {
      score_id: 3,
      score_value: 5045640,
      pinballer_user_id: testUsers[2].pinballer_user_id,
      machine_id: testMachines[2].machine_id,
      score_date: "2019-04-15 00:00:00"
    },
    {
      score_id: 4,
      score_value: 45445654,
      pinballer_user_id: testUsers[3].pinballer_user_id,
      machine_id: testMachines[3].machine_id,
      score_date: "2019-04-15 00:00:00"
    }
  ];
}

// function makeTestScoresForMachines(testScores, testUsers, testMachines) {
//   return [
//     {
//       score_id: testScores[0].score_id,
//       score_value: testScores[0].score_value,
//       pinballer_user_id: testUsers[0].pinballer_user_id,
//       machine_id: testMachines[0].machine_id,
//       score_date: testScores[0].score_date,
//       machine_name: testMachines[0].machine_name,
//       user_nick_name: testUsers[0].user_nick_name,
//       user_first_name: testUsers[0].user_first_name,
//       user_last_name: testUsers[0].user_last_name
//     },
//     {
//       score_id: testScores[1].score_id,
//       score_value: testScores[1].score_value,
//       pinballer_user_id: testUsers[1].pinballer_user_id,
//       machine_id: testMachines[1].machine_id,
//       score_date: testScores[1].score_date,
//       machine_name: testMachines[0].machine_name,
//       user_nick_name: testUsers[1].user_nick_name,
//       user_first_name: testUsers[1].user_first_name,
//       user_last_name: testUsers[1].user_last_name
//     },
//     {
//       score_id: testScores[2].score_id,
//       score_value: testScores[2].score_value,
//       pinballer_user_id: testUsers[2].pinballer_user_id,
//       machine_id: testMachines[2].machine_id,
//       score_date: testScores[2].score_date,
//       machine_name: testMachines[0].machine_name,
//       user_nick_name: testUsers[2].user_nick_name,
//       user_first_name: testUsers[2].user_first_name,
//       user_last_name: testUsers[2].user_last_name
//     }
//   ];
// }

function seedUsers(db, testUsers) {
  const preppedUsers = testUsers.map(user => ({
    ...user,
    user_password: bcrypt.hashSync(user.user_password, 1)
    //I will need to undo this to account for hashed passwords
  }));
  return db
    .into("pinballer_users")
    .insert(preppedUsers)
    // .then(() =>
    //   // update the auto sequence to stay in sync
    //   db.raw(`SELECT setval('pinballer_users_id_seq', ?)`, [
    //     testUsers[testUsers.length - 1].id
    //   ])
    // );
}

function seedLocations(db, testLocations) {
  return db.into("pinballer_locations").insert(testLocations);
}

// function seedUsers(db, testUsers) {
//   return db.into("pinballer_users").insert(testUsers)
//   }

function seedMachines(db, testMachines) {
  return db.into("pinballer_machines").insert(testMachines);
}

function seedScores(db, testScores) {
  return db.into("pinballer_scores", testScores);
}

function seedAllTables(db, testUsers, testLocations, testMachines, testScores) {
  seedUsers(db, testUsers)
    .then(seedLocations(db, testLocations))
    .then(seedMachines(db, testMachines))
    .then(seedScores(db, testScores));
}

function makePinballFixtures() {
  const testUsers = makeUsersArray();
  const testLocations = makeLocationsArray();
  const testMachines = makeMachinesArray(testLocations);
  const testScores = makeScoresArray(testUsers, testMachines);
  // const testScoresForMachines = makeTestScoresForMachines(
  //   testScores,
  //   testUsers,
  //   testMachines
  // );
  return {
    testUsers,
    testLocations,
    testMachines,
    testScores,
    // testScoresForMachines
  };
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

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_nick_name,
    algorithm: "HS256"
  });
  return `Bearer ${token}`;
}


module.exports = {
  makeUsersArray,
  makeLocationsArray,
  makeMachinesArray,
  makeScoresArray,
  makePinballFixtures,
  makeAuthHeader,
  cleanTables,
  seedUsers,
  seedLocations,
  seedMachines,
  seedScores,
  seedAllTables
};
