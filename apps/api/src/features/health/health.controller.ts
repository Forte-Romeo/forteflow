import type { RequestHandler } from 'express';

import { checkDatabaseConnection } from '../../db/database.js';

/**
 * Confirms that the API process is running.
 */
export const getLiveness: RequestHandler = (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: 'alive',
    },
  });
};

/**
 * Confirms that the API and its required database dependency are available.
 */
export const getReadiness: RequestHandler = async (_req, res) => {
  try {
    await checkDatabaseConnection();

    res.status(200).json({
      success: true,
      data: {
        status: 'ready',
        dependencies: {
          database: 'connected',
        },
      },
    });
  } catch {
    res.status(503).json({
      success: false,
      error: {
        code: 'SERVICE_UNAVAILABLE',
        message: 'The API is not ready to handle requests.',
      },
    });
  }
};
