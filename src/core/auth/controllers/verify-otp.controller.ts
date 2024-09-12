import { Request, Response } from "express";
import errorHandler from "../../../helpers/error-handler";
import userService from "../../users/user.service";
import responseObject from "../../../helpers/response-object";

export default async (req: Request, res: Response) => {
  try {
    const { otp, email, newPassword } = req.body;
    const compare = await userService.compareOTP(email, otp);

    if (!compare) {
      return res.status(400).json(
        responseObject({
          message: "Invalid/Expired OTP",
        })
      );
    }

    await userService.updatePassword(email, newPassword);
    return res.status(200).json(
      responseObject({
        message: "Password changed successfully",
      })
    );
  } catch (error) {
    return errorHandler(res, error);
  }
};
