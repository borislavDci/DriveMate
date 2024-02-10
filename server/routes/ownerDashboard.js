import express from "express";
import verifyToken from "../middleware/auth.js";
import { getDashboardData } from "../controllers/OwnerDashboardController.js";

const ownerDashboardRouter = express.Router();

ownerDashboardRouter.route("/").get(verifyToken, getDashboardData);

export default ownerDashboardRouter;
