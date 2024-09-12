import { USER_TYPE } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import responseObject from "../helpers/response-object";

export default (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const { type } = req.user;

  if (type == USER_TYPE.ADMIN) {
    return next();
  }

  return res.status(403).json(
    responseObject({
      message: "Permission denied",
    })
  );
};
