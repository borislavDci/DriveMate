import express from "express";
import verifyToken from "../middleware/auth.js";
import {
  createListing,
  getAllListings,
  deleteListing,
  updateListing,
  getListing,
} from "../controllers/ListingController.js";

const listingRoute = express.Router();

listingRoute.get("/all", getAllListings);

listingRoute
  .route("/")
  .get(getListing)
  .post(verifyToken, createListing)
  .patch(verifyToken, updateListing)
  .delete(verifyToken, deleteListing);

export default listingRoute;
