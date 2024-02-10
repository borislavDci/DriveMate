import express from "express";
import { createBooking } from "../controllers/BookingControlers.js";
import verifyToken from "../middleware/auth.js";

const bookingRouter = express.Router();

bookingRouter.route("/").post(verifyToken, createBooking);

export default bookingRouter;
