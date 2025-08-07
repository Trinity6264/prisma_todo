import CustomError from "./custom_error";

/**
 * Custom error class for handling forbidden access scenarios
 *
 * @class ForbiddenError
 * @extends {CustomError}
 * @description Thrown when a user is authenticated but lacks permission to access a resource
 *
 * @example
 * ```typescript
 * // Usage example
 * if (!hasPermission) {
 *   throw new ForbiddenError('Access denied: insufficient permissions');
 * }
 * ```
 */
class ForbiddenError extends CustomError {
  /**
     * Creates an instance of ForbiddenError
     *
     * @param {string} message - The error message describing the forbidden access
     * @param {number} statusCode - The HTTP status code associated with the error (defaults to 403)
     * @constructor
     */
  constructor(message: string, public statusCode: number = 403) {
    super(message, statusCode);
  }
}

export default ForbiddenError;
