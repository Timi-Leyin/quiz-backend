import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import responseObject from "../helpers/response-object";

export default (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array().map((err) => {
      return {
        // @ts-ignore
        field: err.path,
        message: err.msg||"Invalid Field",
      };
    });
    return res.status(400).json(
      responseObject({
        message: "Fill in the Required Field",
        errors: error,
      })
    );
  }
  next();
};
