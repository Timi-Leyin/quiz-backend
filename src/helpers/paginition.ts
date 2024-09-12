import { Request } from "express";

export const getPaginaionParams = (req: Request) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const offset = (page - 1) * limit;

  return { page, limit, offset };
};
