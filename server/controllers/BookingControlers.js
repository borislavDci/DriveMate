import Listing from "../models/listingModel.js";
import Booking from "../models/bookingModel.js";
import User from "../models/userModel.js";

/**
 * Create a new booking
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const createBooking = async (req, res) => {
  try {
    const { carId, startDateString, endDateString, totalPrice } = req.body;
    const userId = req.tokenId;

    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    const listing = await Listing.findById(carId);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    // Convert the requested dates to milliseconds for comparison with the booked dates
    const startMs = new Date(startDate).getTime();
    const endMs = new Date(endDate).getTime();

    // Check if the car is available for the requested dates by comparing the requested dates with the booked dates
    const isCarAvailable = listing.dates.every((dateRange) => {
      const startRangeMs = new Date(dateRange.start).getTime();
      const endRangeMs = new Date(dateRange.end).getTime();
      // If the requested start date is less than the booked end date and the requested end date is greater than the booked start date, the car is not available
      return endMs < startRangeMs || startMs > endRangeMs;
    });

    if (!isCarAvailable) {
      return res
        .status(400)
        .json({ message: "Car is not available for the requested dates" });
    }

    // If the car is available, create the booking
    const newBooking = await Booking.create({
      startDate,
      endDate,
      carId,
      userId,
      totalPrice,
      createdAt: new Date(),
    });
    const user = await User.findById(userId);
    user?.bookings?.push(newBooking._id);
    await user.save();
    listing.dates.push({ start: startDate, end: endDate });
    console.log(newBooking);
    await listing.save();
    res.status(201).json(newBooking);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export { createBooking };
