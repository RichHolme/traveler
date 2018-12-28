const router = require("express").Router();
const usersController = require("../../controllers/usersController");
// API route user/...
router
  .route("/")
  .get(usersController.findAll)
  .post(usersController.create);

router
  .route("/:id")
  .get(usersController.findById)
  .put(usersController.update)
  .delete(usersController.remove);

// router.route("/userTrips/:id").put(usersController.addTrip);
module.exports = router;
