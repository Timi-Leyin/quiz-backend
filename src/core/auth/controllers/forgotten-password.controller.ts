import { Request, Response } from "express";
import errorHandler from "../../../helpers/error-handler";
import userService from "../../users/user.service";
import responseObject from "../../../helpers/response-object";

export default async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await userService.getUser({ email });
    if (!user) {
      return res.status(404).json(
        responseObject({
          message: "Account with email not found",
        })
      );
    }

    const otp = await userService.saveOTP(email);
    // TODO [x]: do not send otp if previous one was sent within 5mins
    if (!otp) {
      return res.status(400).json(
        responseObject({
          message: "Try again in 5 mins",
        })
      );
    }

    return res.status(200).json(
      responseObject({
        message: "OTP sent successfully",
      })
    );
  } catch (error) {
    return errorHandler(res, error);
  }
};
