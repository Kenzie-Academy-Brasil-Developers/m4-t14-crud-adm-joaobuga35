import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

export const ensureValidatedBody =
  (schema: ZodTypeAny) =>
  async (req: Request, resp: Response, next: NextFunction) => {
    const validatedData = schema.parse(req.body);

    req.body = validatedData;

    return next();
  };
