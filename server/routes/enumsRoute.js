import express from "express";
import Listing from "../models/listingModel.js";
import { StatusCodes } from "http-status-codes";

const enumsRouter = express.Router();

enumsRouter.route("/make").get((req, res) => {
  const makeEnums = Listing.schema.path("make").enumValues;
  res.json(makeEnums);
});

enumsRouter.route("/model").get((req, res) => {
  const make = req.query.make;
  if (!make)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Please provide a make" });

  const modelEnums = Listing.schema
    .path("model")
    .validate()
    .validators[1].validator(null, make);
  if (!modelEnums)
    return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid make" });
  res.json(modelEnums);
});

enumsRouter.route("/features").get((req, res) => {
  const featuresEnums = Listing.schema.path("features").caster.enumValues;
  console.log(Listing.schema.path("model"));
  res.json(featuresEnums);
});

export default enumsRouter;
