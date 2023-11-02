import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const bookingSchema = new mongoose.Schema({
  userId: { type: ObjectId, ref: "users" },
  carId: { type: ObjectId, ref: "listings" },
  startDate: Date,
  endDate: Date,
  totalPrice: Number,
  status: String,
  createdAt: Date,
});

const Booking = mongoose.model("booking", bookingSchema, "bookings");

export default Booking;
