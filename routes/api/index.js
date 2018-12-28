const router = require("express").Router();
const tripRoutes = require("./trips");
const userRoutes = require("./users");
const shelterRoutes = require("./shelters");
const activityRoutes = require("./activity");

// Book routes
router.use("/trips", tripRoutes);
router.use("/users", userRoutes);
router.use("/shelter", shelterRoutes);
router.use("/activity", activityRoutes);

module.exports = router;
