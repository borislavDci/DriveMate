import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const bookingSchema = new mongoose.Schema({
  userId: { type: ObjectId, ref: "users" },
  rating: { type: Number, enum: [1, 2, 3, 4, 5] },
  comement: String,
  carId: { type: ObjectId, ref: "listings" },
  createdAt: Date,
});

const Booking = mongoose.model("booking", bookingSchema, "bookings");

export default Booking;
