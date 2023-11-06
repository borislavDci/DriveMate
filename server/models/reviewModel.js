import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const bookingSchema = new mongoose.Schema({
  userId: { type: ObjectId, ref: "user" },
  rating: { type: Number, enum: [1, 2, 3, 4, 5] },
  comement: String,
  carId: { type: ObjectId, ref: "listing" },
  createdAt: Date,
});

const Booking = mongoose.model("review", bookingSchema, "reviews");

export default Booking;
