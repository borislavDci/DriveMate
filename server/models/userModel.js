import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: String,
  password: String,
  profile: {
    firstName: { type: String },
    lastName: String,
    drivingLicense: String,
    address: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      postalCode: {
        type: String,
      },
      country: {
        type: String,
      },
    },
  },
  avatarURL: String,
  role: {
    type: String,
    enum: ["customer", "carOwner", "admin"],
    default: "customer",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  listings: [{ type: ObjectId, ref: "listing" }],
  bookings: [{ type: ObjectId, ref: "booking" }],
  favoriteListings: [{ type: ObjectId, ref: "listing" }],
});

const User = mongoose.model("user", userSchema, "users");

export default User;
