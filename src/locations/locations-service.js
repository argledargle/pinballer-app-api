const xss = require("xss");

const LocationsService = {
  getAllLocations(db) {
    return db
      .from("pinballer_locations")
      .select("location_name", "location_address", "location_id")
      .orderBy("location_name");
  },

  getMachinesForLocation(db, location_id) {
    return db
      .select("*")
      .from("pinballer_locations")
      .where("pinballer_locations.location_id", location_id)
      .leftJoin(
        "pinballer_machines",
        "pinballer_machines.location_id",
        "pinballer_locations.location_id"
      );
  },

  getById(db, location_id) {
    return db
      .from("pinballer_locations")
      .where("location_id", location_id)
      .select("location_id");
  },

  // deleteLocation(db, location_id) {
  //   return db
  //     .from("pinballer_locations")
  //     .where("location_id", location_id)
  //     .delete();
  // },

  // deleteMachineOnDeleteLocation(db, location_id) {
  //   return db
  //     .from("pinballer_machines")
  //     .where("pinballer_machines.location_id", location_id)
  //     .into("location_id", 0);
  // },

  insertLocation(db, newLocation) {
    return db
      .insert(newLocation)
      .into("pinballer_locations")
      .returning("*")
      .then(([location]) => location);
  },

  hasLocationWithLocationName(db, location_name) {
    return db("pinballer_locations")
      .where({ location_name })
      .first()
      .then(location => !!location);
  },

  hasLocationWithAddress(db, location_address) {
    return db("pinballer_locations")
      .where({ location_address })
      .first()
      .then(location => !!location);
  },

  serializeLocation(location) {
    return {
      location_name: xss(location.location_name),
      location_address: xss(location.location_address)
    };
  }
};

module.exports = LocationsService;
