const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

module.exports = RatingSchema;
