var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TripLegSchema = new Schema({
  city: {
    type: String,
    trim: true,
    required: "City is required"
  },
  arrivalDate: {
    type: Date
  },
  departureDate: {
    type: Date
  },
  shelter: [
    {
      type: Schema.Types.ObjectId,
      ref: "Shelter"
    }
  ],
  activity: [
    {
      type: Schema.Types.ObjectId,
      ref: "Activity"
    }
  ]
});

var TripLeg = mongoose.model("TripLeg", TripLegSchema);

module.exports = TripLeg;
