const router = require("express").Router();
const tripsController = require("../../controllers/tripsController");

// Matches with "/api/trips/"
router.route("/").get(tripsController.findAll);

// Matches with "/api/trips/..."

router
  .route("/:tripId")
  .get(tripsController.findById)
  .put(tripsController.update)
  .delete(tripsController.remove);

router.route("/new").post(tripsController.create);
router.route("/getUserTrips/:userId").get(tripsController.findByUser);
router.route("/addTripLeg/:tripId").post(tripsController.addTripLeg);
router.route("/addShelter/:tripLegId").post(tripsController.addShelter);
router.route("/addActivity/:tripLegId").post(tripsController.addActivity);

module.exports = router;
