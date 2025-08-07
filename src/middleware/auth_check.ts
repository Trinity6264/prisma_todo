import { NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import { JwtPayload, verify, JsonWebTokenError } from "jsonwebtoken";
import BadRequestError from "../errors/bad_request_error";

// Extend Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        username: string;
        email: string;
      };
    }
  }
}

config();

// Checking a new access token if it has expired
export const authCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;
        if (!authorization || !authorization.startsWith('Bearer ')) throw new BadRequestError('Provide a valid token')

        // splitting the string and taking the token out
        const token = authorization.split(' ')[1]

        // decoding the jsonWebToken to get user data
        const data = verify(token, process.env.ACCESS_JWT_SECRET!) as JwtPayload;
        if (!data) throw new BadRequestError('Token provided is invalid')

        // Attach user data to request object
        req.user = {
            id: data.id,
            username: data.username,
            email: data.email,
        };

        next();

    }

    catch (error) {
        if (error instanceof JsonWebTokenError) {
            return res.status(403).json({
                status: false,
                msg: error.message,
                data: {},
            });
        }
        next(error)
    }

}