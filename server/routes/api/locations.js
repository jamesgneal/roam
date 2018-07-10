const router = require("express").Router();
const locationController = require("../../controllers/yelpController");

// Matches with "/api/locations"
router
  .route("/")
  .get(locationController.findAll)
  .post(locationController.create);

// Matches with "/api/locations/yelp"
router
  .route("/yelp")
  .post(locationController.findNew)

// Matches with "/api/locations/:id"
router
  .route("/:id")
  .get(locationController.findById)
  .put(locationController.update)
  .delete(locationController.remove);

module.exports = router;
