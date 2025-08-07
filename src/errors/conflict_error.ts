import CustomError from "./custom_error";

/**
 * Custom error class for handling conflict scenarios
 *
 * @class ConflictError
 * @extends {CustomError}
 * @description Thrown when a request conflicts with the current state of the resource
 *
 * @example
 * ```typescript
 * // Usage example
 * if (existingUser) {
 *   throw new ConflictError('User already exists');
 * }
 * ```
 */
class ConflictError extends CustomError {
  /**
     * Creates an instance of ConflictError
     *
     * @param {string} message - The error message describing the conflict
     * @param {number} statusCode - The HTTP status code associated with the error (defaults to 409)
     * @constructor
     */
  constructor(message: string, public statusCode: number = 409) {
    super(message, statusCode);
  }
}

export default ConflictError;
