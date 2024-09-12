import { Request, Response } from "express";
import errorHandler from "../../../helpers/error-handler";
import userService from "../../users/user.service";
import responseObject from "../../../helpers/response-object";

export default async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const userProfile = await userService.getUserProfile({
      uuid: userId,
    });
    if (!userProfile) {
      return res.status(404).json(
        responseObject({
          message: "Profile not Found",
        })
      );
    }

    return res.status(200).json(
      responseObject({
        message: "Profile retrived successfully",
        data: userProfile,
      })
    );
  } catch (error) {
    return errorHandler(res, error);
  }
};
