import { validationResult } from "express-validator";

const expressValidator = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ status: "error", message: result.array() });
  }

  next();
};

export default expressValidator;
