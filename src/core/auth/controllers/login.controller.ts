import { Request, response, Response } from "express";
import errorHandler from "../../../helpers/error-handler";
import userService from "../../users/user.service";
import responseObject from "../../../helpers/response-object";
import { generateToken } from "../../../helpers/token";

export default async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // check if email exists
    const user = await userService.getUser({ email }, true);

    // user does not exists
    if (!user) {
      return AccountNotFound(res);
    }

    //  check password
    const passwordMatch = await userService.comparePassword(
      password,
      user.password?.content ?? ""
    );

    // password does not match
    if (!passwordMatch) {
      return AccountNotFound(res);
    }

    //  generate access token
    const payload = {
      id: user.uuid,
    };
    const token = await generateToken(payload);
    return res.status(200).json(
      responseObject({
        message: "Logged in successfully",
        accessToken: token,
      })
    );
  } catch (error) {
    return errorHandler(res, error);
  }
};

// CONTROLLER SPECIFIC FUNCTIONS
function AccountNotFound(res: Response) {
  return res.status(400).json(
    responseObject({
      message: "Account associated with credentials not found",
    })
  );
}
