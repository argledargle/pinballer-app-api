const express = require("express");
const LocationsService = require("./locations-service");
// const { requireAuth } = require("../middleware/jwt-auth");

const locationsRouter = express.Router();

locationsRouter.route("/").get((req, res, next) => {
  LocationsService.getAllLocations(req.app.get("db"))
    .then(locations => {
      res.json(locations);
    })
    .catch(next);
});

module.exports = locationsRouter;
