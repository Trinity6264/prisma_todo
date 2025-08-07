import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import AsyncWrapper from '../helper/async_wrapper';
import BadRequestError from '../errors/bad_request_error';

export const validateRequest = AsyncWrapper(async (req: Request, res: Response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message = errors.array()[0]?.msg;
        throw new BadRequestError(message);
    }
    next();
});


