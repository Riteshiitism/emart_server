const mongoose = require("mongoose");
const Product  = require("./productModel");

const wishlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Product',
    }
  ],
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
