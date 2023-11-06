import StatusCodes from "http-status-codes";
import User from "../models/userModel.js";
import Listing from "../models/listingModel.js";

const getAllListings = async (req, res) => {
  const allListings = await Listing.find({});

  if (allListings.length === 0) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ status: "error", message: "Not found" });
  }

  return res.status(StatusCodes.OK).send({ allListings });
};

const createListing = async (req, res) => {
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
    res
      .status(StatusCodes.FORBIDDEN)
      .send({ status: "error", message: "FORBIDDEN" });
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

export { getAllListings, createListing, deleteListing };
