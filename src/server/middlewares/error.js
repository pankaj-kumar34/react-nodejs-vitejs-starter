import createError, { isHttpError } from 'http-errors';
import { getLogger } from '../utils';

const logger = getLogger('error');

/**
 * express not found error handler
 * @param request express request
 * @param response express response
 * @param next express next function
 * @returns http error 404
 */
export const notFoundHandler = (request, response, next) => {
  // return 404 not found for unknown routes
  return next(new createError.NotFound('Resource not found'));
};

/**
 * global express error handler for unhandled programming and thrown http errors
 * @param error http error
 * @param request express request
 * @param response express response
 * @param next express next function
 * @returns void
 */

// eslint-disable-next-line no-unused-vars
export const errorHandler = (error, request, response, next) => {
  let status = error.status || 500;
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal Server Error';

  // checks if it is a programming error or http error
  // send 500 internal server error for programming errors
  if (!isHttpError(error)) {
    status = 500;
    statusCode = 500;
    message = 'Internal Server Error';
  }

  // logs http error and unhandled programming error
  logger.error(error.message);

  return response.status(status).json({ statusCode, message });
};
