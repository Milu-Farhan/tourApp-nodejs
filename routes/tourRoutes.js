const express = require("express");
const tourController = require("./../controllers/tourController");

const router = express.Router();

router.get("/tour-stats", tourController.getTourStats);
router.get("/montly-plan/:year", tourController.getMonthlyPlan);

router.get(
  "/top-5-tour",
  tourController.aliasTopTours,
  tourController.getAllTours
);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
