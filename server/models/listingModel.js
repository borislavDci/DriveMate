import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const currentYear = new Date().getFullYear();

const listingSchema = new mongoose.Schema({
  ownerId: { type: ObjectId, ref: "user" },
  make: {
    type: String,
    required: true,
    enum: ["VW", "BMW"], // Allowed make values
  },
  model: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const allowedModels = {
          VW: ["Golf", "Passat"],
          BMW: ["3", "5"],
        };
        return allowedModels[this.make].includes(value);
      },
      message: (props) =>
        `${props.value} is not valid model for the selected make`,
    },
  },
  year: {
    type: Number,
    required: true,
    min: [1920, "Year must be greater than or equal to 1920"],
    max: [currentYear, `Year must be less than or equal to ${currentYear}`],
  },
  description: String,
  images: [String],
  pricePerDay: Number,
  currency: { type: String, enum: ["Euro", "US Dollar"], default: "Euro" },
  location: {
    name: String,
    cordinates: [String],
  },
  reviews: { type: ObjectId, ref: "review" },
});

const Listing = mongoose.model("listing", listingSchema, "listings");

export default Listing;
