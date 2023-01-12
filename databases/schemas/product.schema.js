const mongoose = require("mongoose");
const BrandSchema = require("./brand.schema");
const OfferSchema = require("./offer.schema");
const RatingSchema = require("./rating.schema");

const ProductSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  brand: BrandSchema,
  offers: {
    type: OfferSchema,
  },
  image: {
    type: String,
  },
  rating: RatingSchema,
  category: String,
});

// mapping ProductSchema to "product" collection (mongo db )
module.exports = mongoose.model("Product", ProductSchema);
