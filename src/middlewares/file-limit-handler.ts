import { NextFunction, Request, Response } from "express";
import responseObject from "../helpers/response-object";

export default (req: Request, res: Response, next: NextFunction) => {
  console.log(req.files)
  return res.status(400).json(
    responseObject({
      message: "File size limit has been reached",
    })
  );
};
