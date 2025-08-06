
import CustomError from "./custom_error";

/**
 * Custom error class for handling unauthorized access scenarios
 *
 * @class UnauthorizedError
 * @extends {CustomError}
 * @description Thrown when a user attempts to access a resource they are not authorized to access
 *
 * @example
 * ```typescript
 * // Usage example
 * if (!document) {
 *   throw new NotFoundError('User document not found');
 * }
 * ```
 */
class UnauthorizedError extends CustomError {
  /**
     * Creates an instance of UnauthorizedError
     *
     * @param {string} message - The error message describing the unauthorized access
     * @param {number} statusCode - The HTTP status code associated with the error
     * @constructor
     */
  constructor(message: string, public statusCode: number = 401) {
    super(message, statusCode);
  }
}

export default UnauthorizedError;
