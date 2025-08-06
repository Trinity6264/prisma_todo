/**
 * Base class for custom application errors
 *
 * @class CustomError
 * @extends {Error}
 * @description Provides a base class for all custom application errors
 *
 * @example
 * ```typescript
 * class SpecificError extends CustomError {
 *   constructor(message: string) {
 *     super(message);
 *   }
 * }
 * ```
 */
class CustomError extends Error {
  /**
       * Creates a new instance of CustomError
       *
       * @param {string} message - Error message describing what went wrong
       * @param {number} statusCode - HTTP status code associated with the error
       * @constructor
       */
  constructor(message: string, public statusCode: number = 500) {
    super(message);

    // Ensure proper prototype chain for instanceof checks
    Object.setPrototypeOf(this, CustomError.prototype);

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
