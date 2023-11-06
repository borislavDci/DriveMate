import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const listingSchema = new mongoose.Schema({
  ownerId: { type: ObjectId, ref: "user" },
  make: String,
  model: String,
  year: Number,
  description: String,
  images: [String],
  pricePerDay: Number,
  location: {
    name: String,
    cordinates: [String],
  },
  reviews: { type: ObjectId, ref: "reviews" },
});

const Listing = mongoose.model("listing", listingSchema, "listings");

export default Listing;
