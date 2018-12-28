const db = require("../models");
const sheltersController = require("./sheltersController");
const activitiesController = require("./activitiesController");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Trip.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Trip.findById(req.params.tripId)
      .populate("tripLegs")
      .populate({
        path: "tripLegs",
        populate: {
          path: "activity",
          model: "Activity"
        }
      })
      .populate({
        path: "tripLegs",
        populate: {
          path: "shelter",
          model: "Shelter"
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Trip.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Trip.findOneAndUpdate({ _id: req.params.tripId }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Trip.findOneAndRemove({ _id: req.params.tripId })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByUser: function(req, res) {
    db.Trip.find({ tripUser: req.params.userId })
      .populate("tripLegs")
      .populate({
        path: "tripLegs",
        populate: {
          path: "activity",
          model: "Activity"
        }
      })
      .populate({
        path: "tripLegs",
        populate: {
          path: "shelter",
          model: "Shelter"
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  addTripLeg: function(req, res) {
    db.TripLeg.create(req.body)
      .then(dbModel =>
        db.Trip.findOneAndUpdate(
          { _id: req.params.tripId },
          { $push: { tripLegs: dbModel._id } }
        )
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  addShelter: function(req, res) {
    db.Shelter.findOne({ hotelId: req.body.hotelId })
      .then(shelter => {
        if (shelter !== null) {
          console.log("Shelter in DB");
          console.log(shelter);
          return db.TripLeg.findOneAndUpdate(
            { _id: req.params.tripLegId },
            { $push: { shelter: shelter._id } }
          );
        } else {
          console.log("Shelter Not in DB");
          return db.Shelter.create(req.body).then(dbModel => {
            return db.TripLeg.findOneAndUpdate(
              { _id: req.params.tripLegId },
              { $push: { shelter: dbModel._id } }
            );
          });
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  addActivity: function(req, res) {
    db.Activity.findOne({ activityId: req.body.activityId })
      .then(activity => {
        if (activity !== null) {
          console.log("Activity in DB");
          console.log(activity);
          return db.TripLeg.findOneAndUpdate(
            { _id: req.params.tripLegId },
            { $push: { activity: activity._id } }
          )
            .populate("shelter")
            .populate("activity");
        } else {
          console.log("Activity Not in DB");
          return db.Activity.create(req.body).then(dbModel => {
            return db.TripLeg.findOneAndUpdate(
              { _id: req.params.tripLegId },
              { $push: { activity: dbModel._id } }
            )
              .populate("shelter")
              .populate("activity");
          });
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
