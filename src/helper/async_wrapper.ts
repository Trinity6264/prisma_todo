
import { Request, Response, NextFunction, RequestHandler } from "express";

const AsyncWrapper = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default AsyncWrapper;
