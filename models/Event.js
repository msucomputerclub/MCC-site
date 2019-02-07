const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Event Schema

const EventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  img: {
    data: Buffer,
    contentType: String
  },
  description: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  rsvp: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
      present: {
        type: Boolean,
        default: false
      }
    }
  ],
  require_prereg: {
    type: Boolean,
    default: false
  },
  capacity: {
    type: Number
  }
});

module.exports = Event = mongoose.model("events", EventSchema);
