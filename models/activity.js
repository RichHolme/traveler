var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
  name: {
    type: String,
    required: "Activity Name is required"
  },
  address: {
    type: String
  },
  restaurantBoolean: {
    type: Boolean
  },
  activityId: {
    type: String
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

var Activity = mongoose.model("Activity", ActivitySchema);

module.exports = Activity;
