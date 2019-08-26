const LocationsService = {
  getAllLocations(db) {
    return db
      .from("pinballer_locations")
      .select("location_name", "location_address", "location_id")
      .orderBy("location_name");
  }

};

module.exports = LocationsService;
