import express from "express";
import verifyToken from "../middleware/auth.js";
import {
  createListing,
  getAllListings,
  deleteListing,
} from "../controllers/ListingController.js";

const listingRoute = express.Router();

listingRoute.get("/all", getAllListings);

listingRoute
  .route("/")
  .get()
  .post(verifyToken, createListing)
  .put()
  .delete(verifyToken, deleteListing);

export default listingRoute;
