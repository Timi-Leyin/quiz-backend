import { NextFunction, Request, Response } from "express";
import responseObject from "../helpers/response-object";
import { decodeToken } from "../helpers/token";

export default async (req: Request, res: Response, next: NextFunction) => {
  // retrieve the authorization header
  const authHeader = req.headers.authorization ?? "";
  const [bearer, accessToken] = (authHeader.split(" ") ?? []);
  
  if (!bearer || !accessToken) {
    return NotAuthorized(res);
  }

  const decoded = await decodeToken(accessToken);
  if (!decoded.user) {
    return NotAuthorized(res, decoded.error as string);
  }

  // authenticate the request
  // @ts-ignore
  req.user = decoded.user;
  return next();
};

// MIDDLWARE SPECIFIC
function NotAuthorized(res: Response, msg?: string) {
  return res.status(401).json(
    responseObject({
      message: msg || "Not authorized",
    })
  );
}
