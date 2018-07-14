const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  name: { type: String, required: true },
  location: {
    lat: String,
    long: String
  },
  url: { type: String },
  user: { type: String },
  comments: { type: String },
  category: { type: String }

});

const SavedLocation = mongoose.model("Location", locationSchema);

module.exports = SavedLocation;
