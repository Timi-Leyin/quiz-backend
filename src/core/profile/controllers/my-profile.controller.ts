import { Request, Response } from "express";
import responseObject from "../../../helpers/response-object";
import errorHandler from "../../../helpers/error-handler";

export default (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const { user } = req;
    return res.status(200).json(
      responseObject({
        message: "Profile Info retrieved",
        data: user,
      })
    );
  } catch (error) {
    return errorHandler(res, error);
  }
};
