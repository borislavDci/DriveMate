import express from "express";
import verifyToken from "../middleware/auth.js";
import {
  createListing,
  getAllListings,
  deleteListing,
  updateListing,
  getListing,
} from "../controllers/ListingController.js";
import mongooseValidator from "../middleware/mongooseValidator.js";

const listingRoute = express.Router();

listingRoute.get("/all", getAllListings);

listingRoute
  .route("/")
  .get(getListing)
  .post(verifyToken, createListing, mongooseValidator)
  .patch(verifyToken, updateListing, mongooseValidator)
  .delete(verifyToken, deleteListing);

export default listingRoute;
