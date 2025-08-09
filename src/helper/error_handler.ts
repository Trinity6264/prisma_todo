import { Request, Response, NextFunction } from 'express'
import CustomError from '../errors/custom_error';
import NotFoundError from '../errors/not_found_error';
import BadRequestError from '../errors/bad_request_error';
import UnauthorizedError from '../errors/unathorized_error';



const errorHandler = (err: ErrorCallback, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
            status: false,
            message: err.message,
            data: {},
        });
    }
    if (err instanceof NotFoundError) {
        return res.status(err.statusCode).json({
            status: false,
            message: err.message,
            data: {},
        });
    }
    if (err instanceof BadRequestError) {
        return res.status(err.statusCode).json({
            status: false,
            message: err.message,
            data: {},
        });
    }
    if (err instanceof UnauthorizedError) {
        return res.status(err.statusCode).json({
            status: false,
            message: err.message,
            data: {},
        });
    }
    
    return res.status(500).json({
        status: false,
        message: 'Internal server error',
        data: {},
    });
};

export default errorHandler;