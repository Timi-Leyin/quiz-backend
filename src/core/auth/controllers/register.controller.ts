import { Request, Response } from "express";
import errorHandler from "../../../helpers/error-handler";
import userService from "../../users/user.service";
import responseObject from "../../../helpers/response-object";
import { generateToken } from "../../../helpers/token";
export default async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    // check if user with email exists
    const $user = await userService.getUser({ email }, true);

    // user exists
    if ($user) {
      return AccountAlreadyExist(res);
    }
    //  generate access token
    const user = await userService.saveUser({
      email,
      firstName,
      lastName,
      password,
    });
    const payload = {
      id: user.uuid,
    };
    const token = await generateToken(payload);
    return res.status(201).json(
      responseObject({
        message: "Registered successfully",
        accessToken: token,
      })
    );
  } catch (error) {
    return errorHandler(res, error);
  }
};

// CONTROLLER SPECIFIC FUNCTIONS
function AccountAlreadyExist(res: Response) {
  return res.status(400).json(
    responseObject({
      message: "Account already exists",
    })
  );
}
