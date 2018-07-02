const router = require("express").Router();
const locationRoutes = require("./locations");
const userRoutes = require("./user")

router.use("/locations", locationRoutes)
router.use("/user", userRoutes)

module.exports = router;