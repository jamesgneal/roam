const express = require("express");
const router = express.Router();
const locationController = require("../../controllers/yelpController");

// Matches with "/api/locations"
router
  .route("/")
  .get(locationController.findAll)
  .post(locationController.create);

// Matches with "/api/locations/yelp"
router
  .route("/yelp")
  .get(locationController.findNew)

// Matches with "/api/locations/:id"
router
  .route("/:id")
  .get(locationController.findById)
  .put(locationController.update)
  .delete(locationController.remove);

module.exports = router;
