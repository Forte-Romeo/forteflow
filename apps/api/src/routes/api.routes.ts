import { Router } from 'express';

import { healthRouter } from '../features/health/health.routes.js';

const apiRouter = Router();

// API baseline.
apiRouter.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      name: 'ForteFlow API',
      version: 'v1',
      status: 'running',
    },
  });
});

// Health-check endpoints.
apiRouter.use('/health', healthRouter);

export { apiRouter };
