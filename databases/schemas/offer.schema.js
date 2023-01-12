const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
    validate: (v) => v >= 0,
  },
  availability: {
    type: String,
    enum: ["InStock", "OutOfStock"],
  },
});

module.exports = OfferSchema;
