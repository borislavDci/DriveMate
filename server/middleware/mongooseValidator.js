import { StatusCodes } from "http-status-codes";
import mongooseErrorFormater from "../helpers/mongooseErrorFormater.js";

const mongooseValidator = (req, res) => {
  const formattedErrors = mongooseErrorFormater(req.clientErrors);

  if (Object.keys(formattedErrors).length > 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ status: "error", error: formattedErrors });
  }
};

export default mongooseValidator;
