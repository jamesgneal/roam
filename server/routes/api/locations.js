const router = require("express").Router();
const locationController = require("../../controllers/locationController");

// Matches with "/api/locations"
router
  .route("/")
  .get(locationController.findAll)
  .post(locationController.create);

// Matches with "/api/locations/user"
router
  .route("/user")
  //.get(locationController.findAll)
  .post(locationController.findByUsername);

// Matches with "/api/locations/yelp"
router.route("/yelp").post(locationController.findNew);

// Matches with "/api/locations/:id"
router
  .route("/:id")
  .get(locationController.findByUsername)
  .put(locationController.update)
  .delete(locationController.remove);

// Matches with "/api/locations/city"
router.route("/city").post(locationController.getNewCity);

// Matches with "/api/locations/latlng"
router.route("/latlng").post(locationController.getRevCity);

// Matches with "/api/locations/image"
router.route("/image").post(locationController.postImage);

module.exports = router;
