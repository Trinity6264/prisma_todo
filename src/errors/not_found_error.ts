
import CustomError from "./custom_error";

/**
 * Custom error class for handling document not found scenarios
 *
 * @class NotFoundError
 * @extends {CustomError}
 * @description Thrown when a document cannot be found in the database
 *
 * @example
 * ```typescript
 * // Usage example
 * if (!document) {
 *   throw new NotFoundError('User document not found');
 * }
 * ```
 */
class NotFoundError extends CustomError {
  /**
     * Creates an instance of NotFoundError
     *
     * @param {string} message - The error message describing which document was not found
     * @param {number} statusCode - The HTTP status code associated with the error
     * @constructor
     */
  constructor(message: string, public statusCode: number = 404) {
    super(message, statusCode);
  }
}

export default NotFoundError;
