import type { ErrorRequestHandler } from 'express';
import { logger } from '../lib/logger.js';
import { AppError } from '../utils/app-error.js';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  void next;

  const error = err instanceof Error ? err : new Error('Unknown error');

  const isOperationalError = error instanceof AppError;

  const statusCode = isOperationalError ? error.statusCode : 500;

  const code = isOperationalError ? error.code : 'INTERNAL_SERVER_ERROR';

  const message = isOperationalError
    ? error.message
    : 'An unexpected error occurred.';

  logger.error(
    {
      err: error,
      method: req.method,
      url: req.originalUrl,
      statusCode,
    },
    'Request failed',
  );

  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
    },
  });
};
