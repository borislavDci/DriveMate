import { StatusCodes } from "http-status-codes";
import Booking from "../models/bookingModel.js";
import User from "../models/userModel.js";

const getDashboardData = async (req, res) => {
  const user = await User.findById(req.tokenId)
    .select("-password")
    .populate(["listings", "bookings"]);

  await Booking.populate(user.bookings, "carId");

  res.status(StatusCodes.OK).send(user);
};

export { getDashboardData };
