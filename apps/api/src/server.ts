import { env } from './config/env.js';
import { logger } from './lib/logger.js';
import { app } from './app.js';

const server = app.listen(env.PORT, () => {
  logger.info(
    {
      port: env.PORT,
      environment: env.NODE_ENV,
    },
    'ForteFlow API started',
  );
});

export { server };
