import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const bookingSchema = new mongoose.Schema({
  userId: { type: ObjectId, ref: "users" },
  carId: { type: ObjectId, ref: "listing" },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "approved", "revised", "canceled"],
  },
  startDate: Date,
  endDate: Date,
  totalPrice: Number,
  createdAt: Date,
  review: {type: mongoose.Schema.Types.Mixed, default: false}
});

const Booking = mongoose.model("booking", bookingSchema, "bookings");

export default Booking;
