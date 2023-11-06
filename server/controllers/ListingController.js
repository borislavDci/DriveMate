import StatusCodes from "http-status-codes";
import User from "../models/userModel.js";
import Listing from "../models/listingModel.js";
import mongooseErrorFormater from "../helpers/mongooseErrorFormater.js";

const getAllListings = async (req, res) => {
  const allListings = await Listing.find({});

  if (allListings.length === 0) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ status: "error", message: "Not found" });
  }

  return res.status(StatusCodes.OK).send(allListings);
};

const getListing = async (req, res) => {
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
  try {
    const user = await User.findById(req.tokenId);
    const { make, model, year, description, pricePerDay, location } = req.body;
    const newListing = await Listing.create({
      ownerId: user._id,
      make,
      model,
      year,
      description,
      pricePerDay,
      location,
    });
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
  const { make, model, year, description, pricePerDay, location, listingId } =
    req.body;

  try {
    const existingListing = await Listing.findById(listingId);

    if (!existingListing) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send({ status: "error", message: "Not found" });
    }
    existingListing.set({
      make,
      model,
      year,
      description,
      pricePerDay,
      location,
    });
    const updatedListing = await existingListing.save();

    console.log(updatedListing);

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
  try {
    if (!Array.isArray(req.body.listingId)) {
      const deletedListing = await Listing.deleteOne({
        _id: req.body.listingId,
      });

      if (deletedListing.deletedCount === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ status: "error", message: "Not Found" });
      }
    } else {
      const deletedListings = await Listing.deleteMany({
        _id: { $in: req.body.listingId },
      });

      if (deletedListings.deletedCount === 0) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ status: "error", message: "Not Found" });
      }

      if (deletedListings.deletedCount !== req.body.listingId) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ status: "error", message: "Bad request" });
      }
    }
  } catch (error) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ status: "error", message: "Listing not found" });
  }
  res.status(StatusCodes.OK).send({ status: "success" });
};

export {
  getAllListings,
  createListing,
  deleteListing,
  updateListing,
  getListing,
};
