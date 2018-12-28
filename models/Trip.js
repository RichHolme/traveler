var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TripSchema = new Schema({
  tripName: {
    type: String,
    trim: true,
    required: "Trip Name is required"
  },
  tripUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: "Username is required"
  },
  tripLegs: [
    {
      type: Schema.Types.ObjectId,
      ref: "TripLeg"
    }
  ]
});

var Trip = mongoose.model("Trip", TripSchema);

module.exports = Trip;
