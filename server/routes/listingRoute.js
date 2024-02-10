import express from "express";
import verifyToken from "../middleware/auth.js";
import {
  createListing,
  getAllListings,
  deleteListing,
  updateListing,
  getListing,
  getTimeFrameListings,
} from "../controllers/ListingController.js";
import mongooseValidator from "../middleware/mongooseValidator.js";

import { uploadListingImages } from "../helpers/multer.js";

const listingRoute = express.Router();

listingRoute.get("/all", getAllListings);
listingRoute.get('/dates', getTimeFrameListings)
listingRoute
  .route("/")
  .get(getListing)
  .post(
    verifyToken,
    uploadListingImages.any(),
    createListing,
    mongooseValidator
  )
  .patch(
    verifyToken,
    uploadListingImages.any(),
    updateListing,
    mongooseValidator
  )
  .delete(verifyToken, deleteListing);

export default listingRoute;
