const express = require("express");
const path = require("path");
const LocationsService = require("./locations-service");

const locationsRouter = express.Router();
const jsonBodyParser = express.json();

locationsRouter.route("/").get((req, res, next) => {
  LocationsService.getAllLocations(req.app.get("db"))
    .then(locations => {
      res.json(locations);
    })
    .catch(next);
});

//here, we get data for the machines at a specific location by location_id
locationsRouter.route("/machines/:location_id").get((req, res, next) => {
  const { location_id } = req.params;
  if (!req.params)
    return res.status(400).json({
      error: `No location ID found.`
    });
  LocationsService.getMachinesForLocation(req.app.get("db"), location_id)
    .then(machines => {

      res.json(machines);
    })
    .catch(next);
});

//this adds new locations
locationsRouter.post("/", jsonBodyParser, (req, res, next) => {
  const { location_name, location_address } = req.body;
  const newLocation = { location_name, location_address };
  for (const field of ["location_name", "location_address"])
    if (!req.body[field])
      return res.status(400).json({
        error: `Missing '${field}' in request body`
      });

  LocationsService.hasLocationWithAddress(
    req.app.get("db"),
    location_address
  ).then(hasLocationWithAddress => {
    if (hasLocationWithAddress)
      return res.status(400).json({ error: `Location address already used` });
    return (newLocation = {
      location_address,
      location_name
    });
  });

  return LocationsService.insertLocation(req.app.get("db"), newLocation)
    .then(location => {
      res
        .status(201)
        .location(path.posix.join(req.originalUrl, `/${location.location_id}`))
        .json(LocationsService.serializeLocation(location));
    })

    .catch(next);
});

locationsRouter.route("/:location_id").all((req, res, next) => {
  LocationsService.getById(req.app.get("db"), req.params.location_id)
    .then(location => {
      if (!location) {
        return res.status(404).json({
          error: { message: `Location doesn't exist` }
        });
      }
      res.location = location;
      next();
    })
    .catch(next);
});

// .delete((req, res, next) => {
//   LocationsService.deleteMachineOnDeleteLocation(req.app.get("db"), req.query.location_id)
//     .then( () => {
//       LocationsService.deleteLocation(
//         req.app.get("db"),
//         req.query.location_id
//       )
//         .then( () => {
//           res.status(204).end();
//         })

//         .catch(next);
//     })

//     .catch(next);
// LocationsService.deleteMachineOnDeleteLocation(
//   req.app.get("db"),
//   req.params.location_id
// )
//   .then(numRowsAffected => {
//     res.status(204).end();
// //   })

//   .catch(next);
// });

module.exports = locationsRouter;
