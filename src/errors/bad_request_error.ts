
import CustomError from "./custom_error";

/**
 * Custom error class for handling bad request scenarios
 *
 * @class BadRequestError
 * @extends {CustomError}
 * @description Thrown when a user makes a bad request
 *
 * @example
 * ```typescript
 * // Usage example
 * if (!document) {
 *   throw new BadRequestError('Invalid request data');
 * }
 * ```
 */
class BadRequestError extends CustomError {
  /**
     * Creates an instance of BadRequestError
     *
     * @param {string} message - The error message describing the bad request
     * @param {number} statusCode - The HTTP status code associated with the error
     * @constructor
     */
  constructor(message: string, public statusCode: number = 400) {
    super(message, statusCode);
  }
}

export default BadRequestError;
