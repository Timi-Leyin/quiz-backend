import { user as User } from "@prisma/client";
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
