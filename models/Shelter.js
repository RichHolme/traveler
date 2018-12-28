var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ShelterSchema = new Schema({
  name: {
    type: String
  },
  address: {
    type: String
  },
  hotelId: {
    type: String
  },
  guests: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

var Shelter = mongoose.model("Shelter", ShelterSchema);

module.exports = Shelter;
