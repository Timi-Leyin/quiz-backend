import { USER_TYPE } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import responseObject from "../helpers/response-object";

export default (req: Request, res: Response, next: NextFunction) => {
  const { user } = req;
  const isSelling = req.user?.type == USER_TYPE.SELLER;

  // if (isSelling && !user.storeId) {
  //   return res.status(422).json(
  //     responseObject({
  //       message: "You have not completed your profile setup",
  //     })
  //   );
  // }

  return next();
};
