import StatusCodes from "http-status-codes";
import User from "../models/userModel.js";
import Listing, { listingSchema } from "../models/listingModel.js";

const getAllListings = async (req, res) => {
  if (req.query.startDate && req.query.endDate) {
    try {
      const { startDate, endDate } = req.query;
      const listings = await Listing.find({});

      const startMs = new Date(startDate).getTime();
      const endMs = new Date(endDate).getTime();
      const avaibleListings = listings.map((listing) => {
        const isCarAvailable = listing.dates.every((dateRange) => {
          const startRangeMs = new Date(dateRange.start).getTime();
          const endRangeMs = new Date(dateRange.end).getTime();
          return endMs < startRangeMs || startMs > endRangeMs;
        });
        if (isCarAvailable) return listing;
      });
      console.log(`i am sending an response`);
      return res.status(StatusCodes.OK).send(avaibleListings);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  const allListings = await Listing.find({});

  if (allListings.length === 0) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ status: "error", message: "Not found" });
  }

  return res.status(StatusCodes.OK).send(allListings);
};

const getTimeFrameListings = async (req, res) => {};

const getListing = async (req, res) => {
  console.log(req.query.listingId);
  try {
    const listing = await Listing.findById(req.query.listingId);
    if (!listing) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ status: "error", message: "Not Found" });
    }
    return res.status(StatusCodes.OK).send(listing);
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ status: "error", message: `${error}` });
  }
};
const createListing = async (req, res, next) => {
  const images = req.files.map((file) => file.filename);

  try {
    const user = await User.findById(req.tokenId);
    const {
      make,
      model,
      year: productionYear,
      description,
      pricePerDay,
      location,
      color,
      fuelType,
    } = req.body;
    const newListing = await Listing.create({
      ownerId: user._id,
      make,
      model,
      productionYear,
      images,
      color,
      fuelType,
      description,
      pricePerDay,
      location: { name: location },
    });
    user.listings.push(newListing._id);
    await user.save();
    res.status(StatusCodes.CREATED).send(newListing);
  } catch (error) {
    if (error.name !== "ValidationError") {
      return res
        .status(StatusCodes.FORBIDDEN)
        .send({ status: "error", error: error });
    }
    req.clientErrors = error;
    next();
  }
};

const updateListing = async (req, res, next) => {
  const {
    make,
    model,
    year,
    description,
    pricePerDay,
    location,
    listingId,
    imagesToChange,
  } = req.body;
  const images = req.files?.map((file) => file.filename);

  try {
    const existingListing = await Listing.findById(listingId);

    if (!existingListing) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ status: "error", message: "Not found" });
    }

    if (imagesToChange) {
      imagesToChange.split(",").map((imageToChange, index) => {
        existingListing.images[imageToChange] = images[index];
      });
    }

    existingListing.set({
      make,
      model,
      year,
      description,
      pricePerDay,
      location: {
        name: location,
      },
    });
    const updatedListing = await existingListing.save();

    return res.status(StatusCodes.OK).send(updatedListing);
  } catch (error) {
    if (error.name !== "ValidationError") {
      return res
        .status(StatusCodes.FORBIDDEN)
        .send({ status: "error", error: error });
    }
    req.clientErrors = error;
    next();
  }
};

const deleteListing = async (req, res) => {
  const listingId = req.body.listingId;
  console.log(listingId);
  try {
    if (!Array.isArray(listingId)) {
      const deletedListing = await Listing.deleteOne({
        _id: listingId,
      });

      if (deletedListing.deletedCount === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ status: "error", message: "Not Found" });
      }
    } else {
      const deletedListings = await Listing.deleteMany({
        _id: { $in: listingId },
      });

      if (deletedListings.deletedCount === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ status: "error", message: "Not Found" });
      }

      if (deletedListings.deletedCount !== listingId) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ status: "error", message: "Bad request" });
      }
    }
    res.status(StatusCodes.OK).send({ status: "success" });
  } catch (error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ status: "error", message: "Listing not found" });
  }
};

export {
  getAllListings,
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getTimeFrameListings,
};
