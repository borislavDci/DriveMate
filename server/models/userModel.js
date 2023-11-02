import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: String,
  password: String,
  firstName: { type: String },
  lastName: String,
  avatarURL: String,
  isVerfied: String,
  listings: { type: ObjectId, ref: "listings" },
  bookings: { type: ObjectId, ref: "bookings" },
  favoriteListings: { type: ObjectId, ref: "listings" },
});

const User = mongoose.model("user", userSchema, "users");

export default User;
